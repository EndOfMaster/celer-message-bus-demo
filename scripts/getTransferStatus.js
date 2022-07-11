const axios = require('axios').default;

async function main() {
  const data = { "transfer_id": "1aa6ea18c67a1e5b2af9194ef4fb4388a3f8d173274ab26a2d5fe91ed503df83" }
  let returns = await axios.post('https://cbridge-v2-test.celer.network/v2/getTransferStatus', data)
  console.log(returns);
}

main()