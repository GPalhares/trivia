const initialState = {
  ranking: [
    { name: '', score: 10, picture: '' },
  ],
  token: 0,
};

const token = (state = initialState, action) => {
  switch (action.type) {
  case 'addPlayerRanking':
    return {
      ...state,
      ranking: [
        {
          name: action.playerData.name,
          score: action.playerData.score,
          picture: action.playerData.picture,
        },
      ],
    };
  default:
    return state;
  }
};

export default token;
