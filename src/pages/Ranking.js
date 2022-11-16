import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ReactComponent as LogoTrivia } from './svg/LogoTrivia.svg';
import { ReactComponent as StarVector } from './svg/StarVector.svg';

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
      <div className="div__ranking">
        <LogoTrivia />
        <h1 data-testid="ranking-title">RANKING</h1>
        {rank.length > 0 && rank.map((player, idx) => (
          <section key={ idx }>
            <img src={ player.picture } alt={ idx } />
            <p className="p__name" data-testid={ `player-name-${idx}` }>{player.name}</p>
            <div>
              <StarVector />
              <p data-testid={ `player-score-${idx}` }>{player.score}</p>
              <p>pontos</p>
            </div>
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
