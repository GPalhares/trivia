import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Tela de Ranking</h1>
        <button
          onClick={ this.playAgain }
          type="button"
          data-testid="btn-go-home"
        >
          Play Again

        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
