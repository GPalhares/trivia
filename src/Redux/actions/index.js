const profileImage = (userImage) => ({
  type: 'profileImage',
  picture: userImage,
});

const savePlayerInfo = (playerInfo) => ({
  type: 'savePlayerInfo',
  playerInfo,
});

const fetchTokenImage = (hash) => async (dispatch) => {
  try {
    const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    dispatch(profileImage(response.url));
    return response.url;
  } catch (error) {
    console.log(error);
  }
};

export { fetchTokenImage, savePlayerInfo };