import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const mediaDeAcertos = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          {assertions < mediaDeAcertos ? 'Could be better...' : 'Well Done!'}
        </p>

      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
