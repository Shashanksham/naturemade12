export class InformationPage {
    constructor(page) {
      this.page = page;
    }
  
    // ---------------- Contact Section ----------------
    get contactHeading() {
      return this.page.locator('#checkout-main-header');
    }
  
    get emailTextField() {
      return this.page.locator('#email');
    }
  
    get firstName() {
      return this.page.locator('#shippingAddressForm > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div > input');
    }
  
    get lastName() {
      return this.page.locator('#shippingAddressForm > div > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div > input');
    }
  
    get address() {
      return this.page.locator('#shipping-address1');
    }
  
    get appartment() {
      return this.page.locator('#shippingAddressForm > div > div:nth-child(1) > div:nth-child(4) > div > div > div > input');
    }
  
    get city() {
      return this.page.locator('#shippingAddressForm > div > div:nth-child(1) > div:nth-child(5) > div:nth-child(1) > div > div > input');
    }
  
    get zipCode() {
      return this.page.locator('#shippingAddressForm > div > div:nth-child(1) > div:nth-child(5) > div:nth-child(3) > div > div > div > input');
    }
  
    // ---------------- Buttons ----------------
    get shippingbutton() {
      return this.page.locator('.MV9Am > div:nth-child(1) > button');
    }
  
    get continueToPaymentBtn() {
      return this.page.locator('.MV9Am > div:nth-child(1) > button:nth-child(1)');
    }
  
    get applyBtn() {
      return this.page.locator('._4QenE ._17kya4u12._1fragem32._1fragemt6 button:nth-child(2)');
    }
  
    // ---------------- Fields ----------------
    get discountfield() {
      return this.page.locator('#gift-card-field input');
    }
  
    get companylogo() {
      return this.page.locator('.gdtca > header > div > div a');
    }
  
    get returntoCartLink() {
      return this.page.locator('.MV9Am > div:nth-child(2) > a');
    }
  
    // ---------------- Dynamic Locators ----------------
    stateOptions(index) {
      return this.page.locator(`#shippingAddressForm #Select1 > option:nth-child(${index})`);
    }
  
    informationPolicyLink(index) {
      return this.page.locator(`.QiTI2 button:nth-child(${index})`);
    }
  
    informationProductName(index) {
      return this.page.locator(`._4QenE div:nth-child(1) div:nth-child(2) > div:nth-child(${index}) > div:nth-child(2) > div:nth-child(1) > p`);
    }
  
    informationbreadcrumb(index) {
      return this.page.locator(`.lX75M nav ol li:nth-child(${index}) a`);
    }
  
    suggestionsAddress(index) {
      return this.page.locator(`._1tnwc9f1._1tnwc9f0._1fragemaf ul li:nth-child(${index})`);
    }
  
    // ---------------- Policy Titles ----------------
    get refundPolicyTitle() {
      return this.page.locator('#refund-policy-policy-modalTitle h3');
    }
  
    get privacyPolicyTitle() {
      return this.page.locator('.u2pext1l._1fragempa._1fragemly.u2pext1m h3');
    }
  
    get termsofuseTitle() {
      return this.page.locator('#terms-of-service-policy-modalTitle h3');
    }
  
    get cancellationpolicyTitle() {
      return this.page.locator('.u2pext1l._1fragempa._1fragemly.u2pext1m');
    }
  
    // ---------------- Close Icons ----------------
    get refundSubscriptionPolicyClose() {
      return this.page.locator('#refund-policy-policy-modal button');
    }
  
    get privacyPolicyCloseIcon() {
      return this.page.locator('#privacy-policy-policy-modal button');
    }
  
    get termsOfServiceCloseIcon() {
      return this.page.locator('#terms-of-service-policy-modal button');
    }
  
    get cancellationPolicyCloseIcon() {
      return this.page.locator('#subscription-policy-policy-modal button');
    }
  
    get informationsubTotalPrice() {
      return this.page.locator('._4QenE div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > span');
    }
  
    get informationtotalPrice() {
      return this.page.locator('._1fragemns .notranslate');
    }
  
    get informationshippingPrice() {
      return this.page.locator('._4QenE ._1qy6ue6d');
    }
  
    get informationshippingPrice1() {
      return this.page.locator('._4QenE ._1fragem32._1fragemn2:nth-child(4) ._1qy6ue6c');
    }
  
    get discountValidationMsg() {
      return this.page.locator('#gift-card-field div[role="status"]');
    }
  
    get discountValidationMsgClickHere() {
      return this.page.locator('#gift-card-field div[role="status"] p a');
    }
  
    get thankyocompanylogo() {
      return this.page.locator('.main__header > a > img');
    }
  }