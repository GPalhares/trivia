const initialState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  profilePicture: undefined,
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'profileImage':
    return { ...state, profilePicture: action.picture };
  case 'savePlayerInfo':
    return { ...state,
      gravatarEmail: action.playerInfo.email,
      name: action.playerInfo.name };
  case 'addScore':
    return {
      ...state,
      score: state.score
      + action.scoreInfo[0] + (action.scoreInfo[2] * action.scoreInfo[1]),
      assertions: state.assertions + 1,
    };
  case 'zerarScore':
    return { ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      profilePicture: undefined };
  default:
    return state;
  }
};

export default player;
