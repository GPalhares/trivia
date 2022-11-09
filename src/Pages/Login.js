import React from 'react';

export default class Login extends React.Component {
  state = {
    name: '',
    email: '',
  };

  handleState = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <input
          name="name"
          value={ name }
          data-testid="input-player-name"
          type="text"
          onChange={ this.handleState }
        />
        <input
          name="email"
          value={ email }
          data-testid="input-gravatar-email"
          type="text"
          onChange={ this.handleState }
        />
        <button
          disabled={ !name || !email }
          type="button"
          data-testid="btn-play"
        >
          Play
        </button>
      </div>
    );
  }
}
