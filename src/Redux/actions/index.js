const profileImage = (userImage) => ({
  type: 'profileImage',
  picture: userImage,
});

const fetchTokenImage = (hash) => async (dispatch) => {
  try {
    const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
    dispatch(profileImage(response.url));
    console.log(response.url);
  } catch (error) {
    console.log(error);
  }
};

export default { fetchTokenImage };
