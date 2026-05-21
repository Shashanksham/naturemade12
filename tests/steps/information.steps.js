import { expect } from '@playwright/test';
import { InformationPage } from '../pageobjects/informationPage';
import { testdata } from '../constants/testdata';

export class InformationSteps {
  constructor(page) {
    this.page = page;
    this.infoPage = new InformationPage(page);
  }

  async clickCompanylogo() {
    await this.infoPage.companylogo.waitFor({ state: 'visible' });
    await this.infoPage.companylogo.click();
  }

  async thankyoucompanylogo() {
    await this.infoPage.thankyocompanylogo.waitFor({ state: 'visible' });
    await this.infoPage.thankyocompanylogo.click();
  }

  async informationPage() {
    await this.infoPage.contactHeading.waitFor({ state: 'visible' });
    const infoHeader = await this.infoPage.contactHeading.textContent();
    expect(infoHeader.trim()).toBe(testdata.informationpage.contctInfrmtionnHeading);
    await this.infoPage.emailTextField.fill(testdata.informationpage.email);
    await this.infoPage.firstName.waitFor({ state: 'visible' });
    await this.infoPage.firstName.fill(testdata.informationpage.firstName);
    await this.infoPage.lastName.fill(testdata.informationpage.lastName);
    await this.infoPage.address.fill(testdata.informationpage.address1);
    await this.page.evaluate(() => window.scrollBy(0, 600));
    await this.infoPage.suggestionsAddress(2).waitFor({ state: 'visible' });
    await this.infoPage.suggestionsAddress(2).click();
    await this.infoPage.shippingbutton.waitFor({ state: 'visible' });
    await this.infoPage.shippingbutton.click();
  }
}