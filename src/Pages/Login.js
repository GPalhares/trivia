import React from 'react';
import PropTypes from 'prop-types';
import requestUserToken from '../helpers/api';

export default class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  // alo
  handleState = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { history } = this.props;
    const userToken = await requestUserToken();
    localStorage.setItem('token', userToken);
    history.push('game');
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
  history: PropTypes.string.isRequired,
};
