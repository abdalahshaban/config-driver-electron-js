const Web3 = require('web3')
const crypto = require('crypto')
let prime_length = 2048
const diffHell = crypto.createDiffieHellman(prime_length)

/**
 *@desc generate account from web3 using privat key
 *@return `address`
 */
module.exports = async function generateAddress() {
  try {
    const web3 = new Web3('http://localhost:8545')
    // or
    // const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

    diffHell.generateKeys('hex')
    let privateKey = diffHell.getPrivateKey('hex')

    let address = await web3.eth.accounts.privateKeyToAccount(privateKey, true)

    return { address, success: true }
  } catch (error) {
    console.log(error)
    return { error, success: true }
  }
}
