# Báo cáo 

## Hướng dẫn chạy dự án
- Clone dự án từ github qua đường dẫn: https://github.com/danhnc2k/mycoin-app.git
- Chạy lệnh `npm install` để cài đặt các package.
- Chạy lệnh `npm start` để khởi chạy chương trình.


## Các tính năng đã hoàn thành
### 1. Tạo ví
Gồm có 2 lựa chọn:
- Tạo ví từ chuỗi Mnemonic mới được chương trình random.
- Tạo ví từ chuỗi Mnemonic có sẵn mà người dùng nhập vào.
### 2. Xem thống kê tài khoản
- Hiển thị danh sách tài khoản gồm địa chỉ và số dư (balance).
- Thêm địa chỉ mới.
### 3. Gửi coin cho một địa chỉ khác
- Gửi coin cho địa chỉ ví khác chỉ cần nhập địa chỉ nhận và số lượng coin.
- Mức phí gas (Gas Limit) mặc định là 21000.
### 4. Xem lịch sử giao dịch
- Hiển thị danh sách lịch sử giao dịch (được lấy từ etherscan).
- Các thông tin chi tiết cũng được hiển thị trong bảng.


## Các hàm cốt lõi
### 1. Tạo ví
- Sử dụng hàm `Wallet.fromMnemonic(mnemonic, path)`. Trong đó:
  - `Wallet` được import từ thư viện `ethers`.
  - `mnemonic` được tạo từ hàm `generateMnemonic()` - được thư viện `bip39` hỗ trợ (tạo ra chuỗi 12 từ).
  - `path` là derivation path - được tạo với giá trị mặc định là `m/44'/60'/0'/0/`. Giá trị này được sử dụng để tạo ra các địa chỉ ví với thứ tự addressIndex tương ứng: `path = m/44'/60'/0'/0/ + addressIndex`.
### 2. Xem thống kê tài khoản
- Hàm `Wallet.fromMnemonic(mnemonic, path)` sẽ trả về 1 đối tượng là `Wallet` chứa đầy đủ các thông tin của ví, và đối tượng này sẽ được thêm vào mảng danh sách các ví.
- Sử dụng hàm `providers.EtherscanProvider(network, process.env.REACT_APP_API_KEY)` để tạo ra một provider của etherscan. Trong đó:
  - `providers` được import từ thư viện `ethers`.
  - `network` là mạng đang được chọn, gồm có homestead(mainnet), rinkeby, goerli, kovan, ropsten.
  - `process.env.REACT_APP_API_KEY` là api key được lấy từ tài khoản đăng ký trên trang etherscan.io.
- Sử dụng hàm `provider.getBalance(address)` để lấy số dư từ địa chỉ ví `address` tương ứng. Trong đó:
  - `provider` là đối tượng EtherscanProvider được lấy từ hàm phía trên.
  - `address` là địa chỉ ví muốn lấy balance.
### 3. Gửi coin cho một địa chỉ khác
- Sử dụng hàm `signTransaction(tx)` và `sendTransaction(tx)` để thực hiện kí và gửi giao dịch:
```
const tx = {
      to: toAddress,
      value: amountToSend,
};
await currentAccount.signTransaction(tx);
const transaction = await walletSigner.sendTransaction(tx);
```
Trong đó:
  - `currentAccount` là đối tượng `Wallet` được lấy từ lúc tạo ví.
  - `tx` là Object chứa thông tin giao dịch.
### 4. Xem lịch sử giao dịch
- Sử dụng hàm `fetch(url)` để lấy thông tin giao dịch từ etherscan.
- `url` là `${endpointURL}/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${apiKey}`. Trong đó:
  - `endpointURL` là địa chỉ API Enpoint được cung cấp bởi etherscan.
  - `address` là địa chỉ ví muốn lấy lịch sử giao dịch.
  - `apiKey` là api key được lấy từ tài khoản đăng ký trên trang etherscan.io.
 
 
## Cấu trúc dự án
    .
    ├── public                  # Thư mục chứa file index.html và các hình ảnh logo.
    ├── src                     # Thư mục chứa source code chính của chương trình.
    │   ├── api                 # Thư mục chứa các file thực hiện api như api lấy thông tin transaction.
    │   ├── app                 # Thư mục chứa file lưu trữ store của app.
    │   ├── components          # Thư mục chứa các components được chia sẻ sử dụng chung trong dự án.
    │   ├── features            # Thư mục chứa các tính năng chính của app.
    │   ├── util                # Thư mục chứa các file tiện ích.
    │   ├── App.js              # File cấu trúc chương trình chính, Header, Footer, Router,...
    │   ├── index.js            # File gọi hàm thực hiện render App.
    │   └── ...                 # Và các file khác như css.
    ├── .env                    # Chứa các biến môi trường của dự án.
    └── ...                     # Và các thư mục khác như package.json, node_modules,...

## Video demo
Link video youtube: https://youtu.be/4jvYFZzDDgc

## Tài liệu tham khảo
- Về các thư viện sử dụng:
  - Ethers.js v5: https://docs.ethers.io/v5/
  - bip39: https://www.npmjs.com/package/bip39
  - ReactJS: https://reactjs.org/
  - React Router DOM v6: https://reactrouter.com/docs/en/v6/getting-started/overview
  - ReduxToolkit: https://redux-toolkit.js.org/
  - MaterialUI v5: https://mui.com/
- Về các tài liệu hướng dẫn khác:
  - https://github.com/PaulLaux/eth-hot-wallet
  - https://www.freecodecamp.org/news/how-to-build-an-ethereum-wallet-web-app-ac77dcaac573
  - https://ethereum.org/vi/developers/tutorials/send-token-etherjs/
