import { expect } from '@playwright/test';
import { testdata } from '../constants/testdata';
import { cartPage } from '../pageobjects/cartPage';

export class CartPageSteps {
  constructor(page) {
    this.page = page;
    this.cartPage = new cartPage(page);
  }

  async verifyCartPage() {
    const cartHeader = await this.cartPage.cartHeading.textContent();
    expect(cartHeader.trim()).toBe(testdata.titles.yourCartpage);
    await this.page.evaluate(() => window.scrollBy(0, 700));
    await this.cartPage.checkOutBtn.waitFor({ state: 'visible' });
    await this.cartPage.checkOutBtn.click();
  }

  async validationForEmptyCart() {
    await expect(this.cartPage.emptyCartPage).toBeVisible({ timeout: 15000 });
    await expect(this.cartPage.emptyCartPage).toHaveText(testdata.titles.yourCartisEmpty);
  }

  
}