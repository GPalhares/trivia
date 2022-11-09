import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { fetchTokenImage } from '../Redux/actions/index';

class Header extends React.Component {
  async componentDidMount() {
    const { gravatarEmail, dispatch } = this.props;
    const hash = md5(gravatarEmail).toString();

    await dispatch(fetchTokenImage(hash));
  }

  render() {
    const { name, score, profilePicture } = this.props;

    return (
      <div>
        <img src={ profilePicture } alt="gravatar" data-testid="header-profile-picture" />
        <h1 data-testid="header-player-name">{name}</h1>
        <h1 data-testid="header-score">{score}</h1>
        Play
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({

  name: state.player.name,
  //   assertions: state.player,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
  profilePicture: state.player.profilePicture,

});

export default connect(mapStateToProps)(Header);
