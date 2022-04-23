const KEY_WALLET = 'walletAccount';
const KEY_TOTAL_WALLET = 'walletTotal';

const saveToLocalStorage = (data, strName) => {
  localStorage.setItem(strName, JSON.stringify(data));
};

const loadFromLocalStorage = (strName) => {
  const res = JSON.parse(localStorage.getItem(strName));
  return res;
};

const removeFromLocalStorage = (strName) => {
  localStorage.removeItem(strName);
};

const saveEncryptedWalletsToLocalStorage = (encryptedWallets) => {
  const totalWallet = encryptedWallets.length;
  encryptedWallets.forEach((wallet, index) => {
    saveToLocalStorage(wallet, KEY_WALLET + index);
  });
  saveToLocalStorage(totalWallet, KEY_TOTAL_WALLET);
};

const loadEncryptedWalletsFromLocalStorage = () => {
  const totalWallet = loadFromLocalStorage(KEY_TOTAL_WALLET);
  const encryptedWallets = [];
  for (let index = 0; index < totalWallet; index++) {
    const wallet = loadFromLocalStorage(KEY_WALLET + index);
    encryptedWallets.push(wallet);
  }
  return encryptedWallets;
};

const removeEncryptedWalletsFromLocalStorage = () => {
  const totalWallet = loadFromLocalStorage(KEY_TOTAL_WALLET);
  for (let index = 0; index < totalWallet; index++) {
    removeFromLocalStorage(KEY_WALLET + index);
  }
  removeFromLocalStorage(KEY_TOTAL_WALLET);
};

export {
  saveEncryptedWalletsToLocalStorage,
  loadEncryptedWalletsFromLocalStorage,
  removeEncryptedWalletsFromLocalStorage,
};
