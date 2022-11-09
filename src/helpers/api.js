const requestUserToken = async () => {
  const requestResponse = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await requestResponse.json();
  return data.token;
};

export default requestUserToken;
