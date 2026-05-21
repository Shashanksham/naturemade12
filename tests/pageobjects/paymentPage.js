export class paymentPage {
    constructor(page) {
      this.page = page;
  
      // MAIN HEADINGS
      this.paymentHeading = page.locator('#checkout-main-header');
  
      this.billingAddressHeading = page.locator(
        '#checkout-main:nth-child(3) section:nth-child(3) h2'
      );
  
      // BUTTONS / LINKS
      this.payNowButton = page.locator('#checkout-pay-button');
  
      this.returnToShippingLink = page.locator('.MV9Am >div:nth-child(2)>span>a');
  
      this.viewOrderConfirmation = page.locator(
        '._17kya4u1q._1fragem4b._1fragemtw._1fragem3c._1fragemt6:nth-child(2) button'
      );
  
      this.cardErrorMessage = page.locator(
        '#directPaymentMethodDetails #error-for-number'
      );
  
      this.thankYouText = page.locator(
        '.n8k95w1.n8k95w0._1fragemt6.n8k95w2.n8k95wg'
      );
  
      // CARD FIELDS (inside payment section / iframe if applicable)
      this.creditCardField = page.locator(
        '#directPaymentMethodDetails > div > div > div > div > div > div:nth-child(1)'
      );
  
      this.expirationField = page.locator(
        '#directPaymentMethodDetails > div > div > div > div > div > div:nth-child(2) > div:nth-child(1)'
      );
  
      this.securityCode = page.locator(
        '#directPaymentMethodDetails > div > div > div > div > div > div:nth-child(2) > div:nth-child(2)'
      );
    }
  
    // Dynamic locator (converted from function)
    contactBoxHeading(index) {
      return this.page.locator(
        `#checkout-main:nth-child(3) div:nth-child(2) > div:nth-child(${index}) > div:nth-child(1) > div:nth-child(1) > span`
      );
    }
  }