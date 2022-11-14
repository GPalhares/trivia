import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { addPlayerRanking, zerarScore } from '../Redux/actions';
import { ReactComponent as LogoTrivia } from './svg/LogoTrivia.svg';

class Feedback extends Component {
  componentDidMount() {
    const { dispatch, name, score, picture } = this.props;
    dispatch(addPlayerRanking({ name, score, picture }));
  }

  componentWillUnmount() {
    const { ranking, dispatch } = this.props;
    let local = JSON.parse(localStorage.getItem('ranking'));
    // console.log(ranking);
    if (local) {
      local = [...local, ...ranking];
      localStorage.setItem('ranking', JSON.stringify(local));
    } else {
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
    dispatch(zerarScore());
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
    const { assertions, score, picture } = this.props;
    const mediaDeAcertos = 3;
    const testAcertos = assertions < mediaDeAcertos;
    return (
      <>
        <Header />
        <div className="feedback">
          <LogoTrivia />
          <div className="div__feedback">
            <img
              src={ picture }
              alt="user_picture"
              style={ testAcertos
                ? { border: '4px solid #ea5d5d', filter: 'drop-shadow(0 0 9px #ea5d5d)' }
                : { border: '4px solid green', filter: 'drop-shadow(0 0 9px green)' } }
            />
            <h1
              data-testid="feedback-text"
              style={ testAcertos ? { color: '#ea5d5d' } : { color: 'green' } }
            >
              {testAcertos ? 'Could be better...' : 'Well Done!'}
            </h1>
            <div>
              <p>{'Um total de '}</p>
              <p data-testid="feedback-total-score">{score}</p>
              <p>{`${score === 1 ? 'ponto' : 'pontos'}.`}</p>
            </div>
            <div>
              <p>{'Você acertou '}</p>
              <p data-testid="feedback-total-question">{assertions}</p>
              <p>{`${assertions === 1 ? 'questão' : 'questões'}!`}</p>
            </div>
            <section>
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
            </section>
          </div>
        </div>
      </>
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
