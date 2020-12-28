const axios = require('axios').default
/**
 *@desc send public key to data base
 *@param  publicKey from token
 *@return bool - success or failure
 */
export async function sendPublicKey(publicKey) {
  try {
    let sended = await axios.post('http://127.0.0.1:5000/save-public-key', {
      publicKey,
    })

    if (!sended) return false

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
