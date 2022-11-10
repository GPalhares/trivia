const initialState = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
};

export default player;
