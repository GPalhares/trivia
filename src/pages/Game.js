import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../Components/Header';
import '../App.css';

class Game extends Component {
  state = {
    response: '',
    idx: 0,
    showAnswers: false,
    timer: 0,
    resps: [],
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
    console.log('teste');
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
      timer } = this.state;
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
                onClick={ () => this.setState({ showAnswers: true }) }
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
        </div>
      );
    }
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
