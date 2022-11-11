import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { addPlayerRanking } from '../Redux/actions';

class Feedback extends Component {
  componentDidMount() {
    const { dispatch, name, score, picture } = this.props;
    dispatch(addPlayerRanking({ name, score, picture }));
  }

  componentWillUnmount() {
    const { ranking } = this.props;
    let local = JSON.parse(localStorage.getItem('ranking'));
    // console.log(ranking);
    if (local) {
      local = [...local, ...ranking];
      localStorage.setItem('ranking', JSON.stringify(local));
    } else {
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    return true;
  }

  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const mediaDeAcertos = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions < mediaDeAcertos ? 'Could be better...' : 'Well Done!'}
        </p>
        <p>Seu Score: </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p>Seus Acertos: </p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          data-testid="btn-play-again"
          onClick={ this.playAgain }
          type="button"
        >
          Play Again

        </button>
        <button
          onClick={ this.goToRanking }
          type="button"
          data-testid="btn-ranking"
        >
          Ranking

        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  ranking: PropTypes.shape.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  picture: state.player.profilePicture,
  ranking: state.token.ranking,
});

export default connect(mapStateToProps)(Feedback);
