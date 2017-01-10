const InAppBilling = require('react-native-billing')

const productId = 'io.cmichel.motivation.noads'

export async function purchaseNoAds() {
  await InAppBilling.close()  // To be sure the service is close before opening it
  try {
    await InAppBilling.open()
    if (!await InAppBilling.isPurchased(productId)) {
      const details = await InAppBilling.purchase(productId)
      // console.log('You purchased: ', details)
    }
    const transactionStatus = await InAppBilling.getPurchaseTransactionDetails(productId)
    // console.log('Transaction Status', transactionStatus)
    return transactionStatus.purchaseState === 'PurchasedSuccessfully'
    // const productDetails = await InAppBilling.getProductDetails(productId)
    // console.log(productDetails)
  } catch (err) { // called when back button pressed on purchasing or any other non-purchase action
    // console.log(err)
    return false
  } finally {
    // await InAppBilling.consumePurchase(productId) // resets it to be purchasable again, do not want
    await InAppBilling.close()
  }
}

// details / transactionStatus =
// developerPayload : "inapp:android.test.purchased:15e8ed9a-9996-4a2c-b4e2-7ab01d13eaef"
// orderId : "transactionId.android.test.purchased"
// productId : "android.test.purchased"
// purchaseState : "PurchasedSuccessfully"
// purchaseTime : ""
// purchaseToken : "inapp:io.cmichel.motivation:android.test.purchased"
// receiptData : "{"packageName":"io.cmichel.motivation","orderId":"transactionId.android.test.purchased","productId":"android.test.purchased","developerPayload":"inapp:android.test.purchased:15e8ed9a-9996-4a2c-b4e2-7ab01d13eaef","purchaseTime":0,"purchaseState":0,"purchaseToken":"inapp:io.cmichel.motivation:android.test.purchased"}"
// receiptSignature : ""
