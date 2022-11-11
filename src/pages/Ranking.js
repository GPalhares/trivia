import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  state = {
    rank: [],
  };

  componentDidMount() {
    const local = JSON.parse(localStorage.getItem('ranking'));
    const localOrd = local.sort((a, b) => (b.score) - (a.score));
    this.setState({
      rank: localOrd,
    });
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { rank } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Tela de Ranking</h1>
        {rank.length > 0 && rank.map((player, idx) => (
          <section key={ idx }>
            <p data-testid={ `player-name-${idx}` }>{player.name}</p>
            <p data-testid={ `player-score-${idx}` }>{player.score}</p>
            <img src={ player.picture } alt={ idx } />
          </section>
        ))}
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
