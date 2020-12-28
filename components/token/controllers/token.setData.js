const graphene = require('graphene-pk11')
const usbDetect = require('usb-detection')
const path = require('path')
const generateAddress = require('./web3.generateAddress')
const sendPublicKey = require('./token.sendPublicKey')
usbDetect.startMonitoring()

/**
 * @desc — set Data in `token` for first time before user use it
 *
 * @return bool - success or failure
 */
async function setData(req, res) {
  console.log('setData')
  try {
    /**
     *
     * @desc — get pin from req.body
     */
    let { pin = '11112222' } = req.body
    /**
     *
     * @desc — check if token plugin or not using productId: 2055 && vendorId: 2414
     */
    let device = await usbDetect.find(2414, 2055)
    /**
     *
     * @return bool - success or failure in get device
     */
    if (device.length === 0) {
      return res.status(400).json({ success: false })
    }
    /**
     *
     * @desc — load dll library from lib folder
     */
    let dllPath = path.join(__dirname, `../../../lib/eps2003csp11.dll`)
    let mod = graphene.Module.load(dllPath)
    /**
     *
     * @desc — initialize lib to use it after
     */
    mod.initialize()
    /**
     *
     * @desc — GET TOKEN SLOTS
     */
    const slots = mod.getSlots()
    /**
     *
     * @return List of Slots is Empty IF NO SLOTS
     */
    if (!slots.length) {
      mod.finalize()
      return res.status(400).json({ success: false })
    }
    /**
     * @desc — USING FIRST SLOT
     *
     */
    const slot = mod.getSlots(0)
    /**
     *
     * @desc — PREPARE SESSION TO OPEN && ADD PERMISSION RW_SESSION
     */
    const session = slot.open(
      graphene.SessionFlag.RW_SESSION | graphene.SessionFlag.SERIAL_SESSION,
    )
    /**
     *
     * @desc — OPEN SESSION WITH TOKEN USING PIN AND USER TYPE USER
     */
    session.login(pin, graphene.UserType.USER)
    /**
     *
     * @desc — GET PUBLIC KEY FROM TOKEN
     */
    let publicKey = session
      .find({ class: graphene.ObjectClass.PUBLIC_KEY })
      .items(0)
      .toType()
    /**
     *
     * @desc — GET PRIVATE KEY FROM TOKEN
     */
    let privateKey = session
      .find({ class: graphene.ObjectClass.PRIVATE_KEY })
      .items(0)
      .toType()
    /**
     *
     *@desc — generate account from web3 using privat key
     */
    let { address, success } = await generateAddress()
    if (!success) return res.status(400).json({ message: false })
    /**
     *
     *@desc —save address in token
     */
    const addressObject = session.create({
      class: graphene.ObjectClass.DATA,
      label: 'data.address',
      id: new Buffer([1, 2, 3, 4, 5]),
      application: 'ISEC',
      token: true,
      modifiable: true,
      value: Buffer.from(JSON.stringify(address)),
    })
    /**
     *
     *@desc —get data from token using `label` & `application`
     */
    let isecSession = session
      .find({
        application: 'ISEC',
        label: 'data.address',
      })
      .items(0)
      .toType()
    // console.log(JSON.parse(isecSession.value.toString()), 'isecSession')
    /**
     *
     *@desc —send public key to server
     */
    let checkIfSended = await sendPublicKey(publicKey)

    if (!checkIfSended) return res.status(400).json({ message: false })
    /**
     *
     *@desc —close session btw token & application
     */
    session.close()
    mod.finalize()
    return res.status(200).json({ message: true })
  } catch (error) {
    console.log(error, 'error')
    mod.finalize()
    return res.status(400).json({ message: false })
  }
}

module.exports = setData
