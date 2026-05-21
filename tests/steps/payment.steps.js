import { testdata } from '../constants/testdata';
import { expect } from '@playwright/test';

export class PaymentSteps {
  constructor(page) {
    this.page = page;

    // iframe
    this.cardFrame = page.frameLocator('.card-fields-iframe');

    // fields inside iframe
    this.creditcardfield = this.cardFrame.locator('input[name="cardnumber"]');
    this.expirationfield = this.cardFrame.locator('input[name="exp-date"]');
    this.securitycode = this.cardFrame.locator('input[name="cvc"]');
    this.cardNameField = this.cardFrame.locator('input[name="name"]');
  }

  async visaCardDetails() {
    // Credit Card Number
    await this.creditcardfield.waitFor({ state: 'visible' });
    await this.creditcardfield.click();
    await this.creditcardfield.fill(testdata.paymentPageDetails.visaCardNumber);

    // Expiry Date
    await this.expirationfield.waitFor({ state: 'visible' });
    await this.expirationfield.click();
    await this.expirationfield.fill(testdata.paymentPageDetails.expiryDate);

    // CVV
    await this.securitycode.waitFor({ state: 'visible' });
    await this.securitycode.click();
    await this.securitycode.fill(testdata.paymentPageDetails.securityCode);

    // Card Holder Name
    await this.cardNameField.waitFor({ state: 'visible' });
    await this.cardNameField.click();
    await this.cardNameField.fill(testdata.paymentPageDetails.cardName);
  }
}