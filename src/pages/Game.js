import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Header from '../Components/Header';
import { addScore } from '../Redux/actions';
import { ReactComponent as LogoTrivia } from './svg/LogoTrivia.svg';
import { ReactComponent as Timer } from './svg/Timer.svg';

class Game extends Component {
  state = {
    response: '',
    idx: 0,
    showAnswers: false,
    timer: 0,
    resps: [],
    showNext: false,
    handleClick: 0,
  };

  async componentDidMount() {
    const localToken = localStorage.getItem('token');
    const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`)
      .then((resp) => resp.json());
    const { history } = this.props;
    console.log(data);
    if (data.results.length <= 0) {
      localStorage.clear();
      history.push('/');
    } else {
      this.setState({
        response: data.results,
        correct: data.results[0].correct_answer,
        resps: [
          ...data.results[0].incorrect_answers,
          data.results[0].correct_answer,
        ],
      });
      this.setState((prevState) => ({
        resps: this.shuffleArray(prevState.resps),
      }));
    }

    const oneSecond = 1000;
    setInterval(() => this.timer(), oneSecond);
  }

  shouldComponentUpdate() {
    const { showAnswers, timer } = this.state;
    const magic = 30;
    if (timer >= magic && !showAnswers) {
      this.setState({
        showAnswers: true,
      });
    }
    return true;
  }

  timer = () => {
    this.setState((prevState) => ({
      timer: prevState.timer + 1,
    }));
  };

  handleClick = ({ target }) => {
    this.setState({ showAnswers: true, showNext: true });
    const { correct, response, timer } = this.state;
    const magic = 10;
    const { dispatch } = this.props;
    const { name } = target;
    if (response.difficulty === 'hard') {
      const diff = 3;
      if (name === correct) {
        dispatch(addScore([magic, diff, timer]));
      }
    } else if (response.difficulty === 'medium') {
      const diff = 2;
      if (name === correct) {
        dispatch(addScore([magic, diff, timer]));
      }
    } else {
      const diff = 1;
      if (name === correct) {
        dispatch(addScore([magic, diff, timer]));
      }
    }
  };

  handleNext = () => {
    this.setState((prev) => ({ handleClick: prev.handleClick + 1 }));
    const { handleClick } = this.state;
    const { history } = this.props;
    const mgc = 4;
    if (handleClick >= mgc) {
      history.push('/feedback');
    } else {
      this.setState((prev) => ({
        showAnswers: false,
        showNext: false,
        idx: prev.idx + 1,
        correct: prev.response[prev.idx + 1].correct_answer,
        resps: [
          ...prev.response[prev.idx + 1].incorrect_answers,
          prev.response[prev.idx + 1].correct_answer,
        ],
        timer: 0,
      }));
      this.setState((prevState) => ({
        resps: this.shuffleArray(prevState.resps),
      }));
    }
  };

  shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  render() {
    const { response, idx, correct, resps, showAnswers,
      timer, showNext } = this.state;
    const maxNumber = 30;
    if (response.length > 0) {
      return (
        <>
          <Header />
          <div className="div__game">
            <section className="section__question">
              <LogoTrivia />
              <h2
                className={ response[idx].difficulty }
                data-testid="question-category"
              >
                {response[idx].category}
              </h2>
              <p data-testid="question-text">{response[idx].question}</p>
              <section>
                <Timer />
                <p>{`Tempo: ${timer}s`}</p>
              </section>
            </section>
            <div className="div__answer" data-testid="answer-options">
              {resps.map((resp, idxx) => (
                <button
                  disabled={ (timer > maxNumber) || showAnswers }
                  onClick={ this.handleClick }
                  name={ resp }
                  className={ ((timer > maxNumber) || showAnswers) && (correct === resp
                    ? 'correct-answer' : 'wrong-answer') }
                  data-testid={ correct === resp
                    ? 'correct-answer' : `wrong-answer-${idxx}` }
                  type="button"
                  key={ idxx }
                >
                  {resp}
                </button>
              ))}
              {(showNext || timer > maxNumber) && (
                <button
                  onClick={ this.handleNext }
                  type="button"
                  data-testid="btn-next"
                  className="button__next"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </>
      );
    }
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  score: state.player.score,
});

export default connect(mapStateToProps)(Game);
