import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchTokenImage } from '../Redux/actions';

class Header extends React.Component {
  async componentDidMount() {
    const { gravatarEmail, dispatch } = this.props;
    const hash = md5(gravatarEmail).toString();
    await dispatch(fetchTokenImage(hash));
  }

  render() {
    const { name, score, profilePicture } = this.props;
    return (
      <header>
        <i />
        <i />
        <section>
          <img
            src={ profilePicture || 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc' }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
          <h1 data-testid="header-player-name">{name}</h1>
        </section>
        <section>
          <p>⭐️</p>
          <h1 className="h1__pontos">{'Pontos: '}</h1>
          <h1 className="ponto" data-testid="header-score">{score}</h1>
        </section>
      </header>
    );
  }
}

Header.defaultProps = {
  profilePicture: 'https://www.gravatar.com/avatar/c19ad9dbaf91c5533605fbf985177ccc',
  gravatarEmail: 'email.test',
};

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gravatarEmail: PropTypes.string,
  name: PropTypes.string.isRequired,
  profilePicture: PropTypes.string,
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
