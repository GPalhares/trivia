import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import Header from '../Components/Header';
import { addScore } from '../Redux/actions';

class Game extends Component {
  state = {
    response: '',
    idx: 0,
    showAnswers: false,
    timer: 0,
    resps: [],
    showNext: false,
  };

  async componentDidMount() {
    const localToken = localStorage.getItem('token');
    const data = await fetch(`https://opentdb.com/api.php?amount=5&token=${localToken}`)
      .then((resp) => resp.json());
    const { history } = this.props;
    // console.log(data.results);
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
        <div>
          <Header />
          <p>{timer}</p>
          <h2 data-testid="question-category">{response[idx].category}</h2>
          <p data-testid="question-text">{JSON.stringify(response[idx].question)}</p>
          <div data-testid="answer-options">
            {resps.map((resp, idxx) => (
              <button
                disabled={ timer > maxNumber }
                onClick={ this.handleClick }
                name={ resp }
                className={ showAnswers && (correct === resp
                  ? 'correct-answer' : 'wrong-answer') }
                data-testid={ correct === resp
                  ? 'correct-answer' : `wrong-answer-${idxx}` }
                type="button"
                key={ idxx }
              >
                {resp}
              </button>
            ))}
          </div>
          {(showNext || timer > maxNumber)
          && (<button type="button" data-testid="btn-next">Next</button>)}
        </div>
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
