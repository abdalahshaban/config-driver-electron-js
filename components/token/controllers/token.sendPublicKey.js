const axios = require('axios').default
/**
 *@desc send public key to `server`
 *@param  publicKey from `token`
 *@return bool - success or failure
 */
module.exports = async function sendPublicKey(publicKey) {
  try {
    let data = publicKey.getAttribute('modulus').toString('base64')

    let sended = await axios.post(
      'http://127.0.0.1:3000/api/publicKey/create',
      {
        publicKey: data,
      },
    )

    if (!sended) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
