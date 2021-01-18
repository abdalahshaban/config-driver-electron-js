const graphene = require('graphene-pk11')
const usbDetect = require('usb-detection')
const path = require('path')
usbDetect.startMonitoring()
/**
 * @desc — check if `token` inserted or not
 *
 * @return bool - success or failure
 */
module.exports = async function checkToken() {
  let mod
  let dllPath
  try {
    /**
     *
     * @desc — check if token plugin or not using productId: 2055 && vendorId: 2414
     */
    let device = await usbDetect.find(2414, 2055)
    /**
     *
     * @return bool - success or failure in get device
     */
    if (device.length === 0)
      return {
        message: `device not insertd device.length =${device.length}`,
        inserted: false,
      }

    /**
     *
     * @desc — load dll library from lib folder
     */
    dllPath = path.join(process.resourcesPath, 'lib', 'eps2003csp11.dll') //for production
    // dllPath = path.join(__dirname, '../../../lib/eps2003csp11.dll') // for development
    mod = graphene.Module.load(dllPath)
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
      return { message: 'slots.length', inserted: false }
    }

    return { message: 'device insertd', inserted: true, mod, slots }
  } catch (error) {
    // if (mod) {
    //   mod.finalize()
    // }
    return { message: error, inserted: false }
  }
}
