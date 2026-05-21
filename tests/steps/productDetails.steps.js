// @ts-check  ← MUST be line 1

import { expect } from '@playwright/test';
import { testdata } from '../constants/testdata';
import { ProductDetailsPage } from '../pageobjects/productDetailsPage';
import { HomePage } from '../pageobjects/homePage';
import { HomePageSteps } from './homePage.steps';
import { cartPage } from '../pageobjects/cartPage';

export class productDetailSteps {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.homePageStep=new HomePageSteps(page)
    this.productDetails = new ProductDetailsPage(page); 
    this.cartpage=new cartPage(page)

  }

async AddtoCart() {
  await this.homePageStep.productsearch(testdata.searchbar.vitamins);
  await expect(this.homePage.searchResult).toBeVisible();
  await expect(this.homePage.searchResult).toHaveText(testdata.searchbar.vitamins);

  await this.homePageStep.ratingPopup();
  const product = this.productDetails.searchPageProdTitle(2);

  await product.scrollIntoViewIfNeeded();
  await product.dblclick();
  await this.productDetails.addToCart.scrollIntoViewIfNeeded();
  await this.homePageStep.ratingPopup();
  await expect(this.productDetails.addToCart).toBeVisible();
  await this.productDetails.addToCart.click();
  await this.homePageStep.ratingPopup();
  await expect(this.productDetails.viewMyCart).toBeVisible();
  await this.productDetails.viewMyCart.click();
  await expect(this.cartpage.cartHeading).toBeVisible();

  await expect(this.cartpage.cartHeading)
    .toHaveText(testdata.titles.yourCartpage);
}

async selectProductCountByIndex(index) {

  const actualIndex = index - 1; 

  const label = (this.productDetails.productCount).nth(actualIndex);

  await expect(label).toBeVisible({ timeout: 30000 });
  await label.click({force:true});
}

async validateProductCountText(index, expectedText) {
  const label = this.productDetails.getProductCountLabelByIndex(index);

  await expect(label).toContainText(expectedText);
}

async validatePrices(expectedProductPrice, expectedSubscribedPrice) {

  const oneTimePrice = this.productDetails.productPrice1;
  const subsPrice = this.productDetails.subscribedPrice1;
  await expect(oneTimePrice).toBeVisible();
  await expect(subsPrice).toBeVisible();
  await expect(oneTimePrice).toHaveText(expectedProductPrice, {
    timeout: 15000
  });

  await expect(subsPrice).toHaveText(expectedSubscribedPrice, {
    timeout: 15000
  });
}



}
