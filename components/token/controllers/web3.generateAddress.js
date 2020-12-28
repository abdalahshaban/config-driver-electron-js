const Web3 = require('web3')
const web3 = new Web3('http://localhost:8545')
// or
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
/**
 * @desc generate account from web3 using privat key
 *@param  privatekey from token
 *@return address
 */
export async function generateAddress(privateKey) {
  try {
    let address = await web3.eth.accounts.privateKeyToAccount(privateKey)
    return { address, success: true }
  } catch (error) {
    console.log(error)
    return { error, success: true }
  }
}
