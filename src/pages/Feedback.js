import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends Component {
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

      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
