const axios = require('axios')
/**
 *@desc send public key to `server`
 *@param  publicKey from `token`
 *@return bool - success or failure
 */
module.exports = async function sendPublicKey(publicKey) {
  console.log('sendPublicKey')
  try {
    // let sended = await axios.post('http://127.0.0.1:3000/save-public-key', {
    //   publicKey,
    // })

    // if (!sended) return true

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
