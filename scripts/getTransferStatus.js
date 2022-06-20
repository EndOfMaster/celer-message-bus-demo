const axios = require('axios').default;

async function main() {
  const data = { "transfer_id": "af3f158f1d9989b733bd4bae880faa4a935c7672fb6b8cc2ba5a7b2e076bd5a2" }
  let returns = await axios.post('https://cbridge-v2-test.celer.network/v2/getTransferStatus', data)
  console.log(returns);
}

main()