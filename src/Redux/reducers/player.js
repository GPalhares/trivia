const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: 'teste.teste@gmail.com',
  profilePicture: '',
};

const player = (state = initialState, action) => {
  switch (action.type) {
  case 'profileImage':
    return { ...state, profilePicture: action.picture };

  default:
    return state;
  }
};

export default player;
