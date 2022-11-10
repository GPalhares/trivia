import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import requestUserToken from '../helpers/api';
import { savePlayerInfo } from '../Redux/actions';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleState = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { dispatch, history } = this.props;
    const userToken = await requestUserToken();
    localStorage.setItem('token', userToken);
    await dispatch(savePlayerInfo(this.state));
    history.push('/game');
  };

  handleConfig = () => {
    const { history } = this.props;
    history.push('/config');
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          name="name"
          value={ name }
          data-testid="input-player-name"
          type="text"
          onChange={ this.handleState }
        />
        <input
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          type="text"
          onChange={ this.handleState }
        />
        <button
          disabled={ !name || !email }
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>

        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleConfig }
        >
          Configs
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  profilePicture: state.player.profilePicture,

});

export default connect(mapStateToProps)(Login);
