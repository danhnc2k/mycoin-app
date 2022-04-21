export const fetchTransactionList = async (
  network,
  address,
  apiKey = process.env.REACT_APP_API_KEY
) => {
  const endpointURL = getEndpointURL(network);
  const url = `${endpointURL}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`;
  try {
    const rawTransactionList = await fetch(url);
    const transactionList = await rawTransactionList.json();
    return transactionList.result;
  } catch (err) {
    return err;
  }
};

const getEndpointURL = (network) => {
  switch (network) {
    case 'mainnet':
    case 'homestead':
      return process.env.REACT_APP_ENDPOINT_MAINNET;
    case 'goerli':
      return process.env.REACT_APP_ENDPOINT_GOERLI;
    case 'kovan':
      return process.env.REACT_APP_ENDPOINT_KOVAN;
    case 'ropsten':
      return process.env.REACT_APP_ENDPOINT_ROPSTEN;
    default:
      return process.env.REACT_APP_ENDPOINT_RINKEBY;
  }
};
