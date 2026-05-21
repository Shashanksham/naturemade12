// @ts-check  ← MUST be line 1

import { expect } from '@playwright/test';
import { HomePage } from '../pageobjects/homePage';
import { testdata } from '../constants/testdata';
import { ProductDetailsPage } from '../pageobjects/productDetailsPage';
import { ProductListPage } from '../pageobjects/productListPage'

import { cartPage } from '../pageobjects/cartPage';
import { accountPage } from '../pageobjects/accountPage';

export class HomePageSteps {
  constructor(page) {
    this.page = page;
    this.homePage = new HomePage(page);
    this.productDetails = new ProductDetailsPage(page); 
    this.accountPage=new accountPage(page);
    this.cartPage = new cartPage(page); 
    this.productListPage=new ProductListPage(page);

  }

  async launchUrl() {
    await this.page.goto(testdata.urls.urlForDev);
    if (await this.homePage.subscribeCancelIcon.isVisible()) {
      await this.homePage.subscribeCancelIcon.click();
    }
    try {
      const frame = this.page.frameLocator('iframe[src*="klaviyo"]');
      await frame.getByRole('button', { name: /close/i }).click({ timeout: 5000 });
    } catch {
      console.log("No subscribe popup");
    }
    await this.homePage.enterUsingPwd.click();
    await this.homePage.pwdEnterField.fill(testdata.validUser.password);
    await this.homePage.enterBtn.click();
    await expect(this.homePage.cmpnyLogo).toBeVisible();
    try {
      await this.homePage.acceptCookieButton.click({ timeout: 10000 });
      if (await this.homePage.subscribeCancelIcon.isVisible()) {
        await this.homePage.subscribeCancelIcon.click();
      }
    
      await this.homePage.bannerName.waitFor({ state: 'visible' });
    } catch {
      console.log("No cookie popup");
    }
  }

  async clickCompanyLogo() {
    await this.homePage.cmpnyLogo.click();
    await expect(this.homePage.bannerName).toBeVisible({ timeout: 5000 });
  }

  async validateBannerText() {
    await expect(this.homePage.bannerName)
      .toHaveText(testdata.homePage.bannerName);
  }

  async clickSigninLink() {
    await this.homePage.signinLink.click();

    await expect(this.homePage.loginPage).toHaveText(testdata.loginPage.signInTitle);
  }

  async ratingPopup() {
    const popupClose = this.page.locator('.rating-popup-close'); 

    if (await popupClose.isVisible().catch(() => false)) {
      await popupClose.click();
    }
  }

  async headerLink1() {
    await this.ratingPopup();
  
    const link = this.homePage.headerLinks(1);
  
    await expect(link).toBeVisible();
  
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      link.click({force:true})
    ]);
  
    await this.ratingPopup();
  }

  async validationForProductHeaderSubmenu() {
    await expect(this.homePage.atoZSubMenu(1)).toBeVisible({timeout:8000});
    await expect(this.homePage.atoZSubMenu(1)).toHaveText(testdata.headers.atoz);

    await expect(this.homePage.productsHeadersubmenus(2)).toBeVisible();
    await expect(this.homePage.productsHeadersubmenus(2)).toContainText(testdata.headers.bybenefits);
    
    await expect(this.homePage.productsHeadersubmenus(3)).toBeVisible();
    await expect(this.homePage.productsHeadersubmenus(3)).toContainText(testdata.headers.gummies);
  
    await expect(this.homePage.productsHeadersubmenus(4)).toBeVisible();
    await expect(this.homePage.productsHeadersubmenus(4)).toContainText(testdata.headers.BestSellers);
  
    await expect(this.homePage.productsHeadersubmenus(5)).toBeVisible();
    await expect(this.homePage.productsHeadersubmenus(5)).toContainText(testdata.headers.NewProducts);
  
    await expect(this.homePage.headerSubMenu(6)).toBeVisible();
    await expect(this.homePage.headerSubMenu(6)).toContainText(testdata.headers.bundleandsave);
  
    await expect(this.homePage.headerSubMenu(7)).toBeVisible();
    await expect(this.homePage.headerSubMenu(7)).toContainText(testdata.headers.subscribeandsave);
  
    await expect(this.homePage.headerSubMenu(8)).toBeVisible();
    await expect(this.homePage.headerSubMenu(8)).toContainText(testdata.headers.ViewAll);
  }
   /**
     * Get product title by index
     * @param {number} index1
     * @param {number} index2
     */

  async productListInSubmenuAtoZ(index1, index2, subheaderTitle) {

    // await this.headerLink1()
    await this.ratingPopup();
    const subMenuItem = this.homePage.productListHeaderAtoZ(index1, index2);
    await expect(subMenuItem).toBeVisible();
    await subMenuItem.click({timeout:15000})
    await this.ratingPopup();  
    await expect(this.homePage.kidsVitamin).toBeVisible();
    await expect(this.homePage.kidsVitamin).toContainText(subheaderTitle);
  
  }

  // async productListInSubmenuAtoZ(index1, index2, subheaderTitle) {
  //   const subMenuItem = this.homePage.productListHeaderAtoZ(index1, index2);
  //   await expect(subMenuItem).toBeVisible({ timeout: 10000 });
  //   const linkText = (await subMenuItem.textContent())?.trim();
  //   await Promise.all([
  //     this.page.waitForLoadState('domcontentloaded'),
  //     subMenuItem.click()
  //   ]);
  //     await this.ratingPopup();
  //   await expect(
  //     this.page.getByRole('heading', { name: subheaderTitle || linkText })).toBeVisible({ timeout: 15000 });
  // }

  async ProductlistInSubmenuBybenefits(index1) {  
    await this.ratingPopup();
  
    await expect(this.homePage.productsHeadersubmenus(2)).toBeVisible();
    await this.homePage.productsHeadersubmenus(2).click();
  
    await this.ratingPopup();
  
    await expect(this.homePage.byBenefitsSubmenuLinks(index1)).toBeVisible();
    await this.homePage.byBenefitsSubmenuLinks(index1).click();
  
    await this.ratingPopup();
  }

  async productsearch(product) {

    // Click logo (navigate to home)
    await this.clickCompanyLogo();
  
    // Open search
    await expect(this.homePage.searchField).toBeVisible();
    await this.homePage.searchField.click();
  
    // Enter product name
    await this.homePage.searchField.fill(product);
  
    // Click search button
    await this.homePage.searchBtn.click();
  
    // Handle popup if present
    await this.ratingPopup();
  
    // Wait for search results page (instead of browser.waitUntil)
    await expect(this.homePage.preHeader).toBeVisible({ timeout: 5000 });
  
    // Validate header text
    await expect(this.homePage.preHeader)
      .toHaveText(testdata.searchbar.subHeader);
  }

  async AddtoCart1() {
    await this.productsearch(testdata.searchbar.vitamins);
    await expect(this.homePage.searchResult).toBeVisible();
    await expect(this.homePage.searchResult).toHaveText(testdata.searchbar.vitamins);
    await this.ratingPopup();
    const product = this.productDetails.searchPageProdTitle(2)
    await product.scrollIntoViewIfNeeded();
    await product.click();
    await this.productDetails.addToCart.scrollIntoViewIfNeeded();
    await this.ratingPopup();
    await expect(this.productDetails.addToCart).toBeVisible();
    await this.productDetails.addToCart.click();
    await this.ratingPopup();
    await expect(this.productDetails.viewMyCart).toBeVisible();
    await this.productDetails.viewMyCart.click();
    await expect(this.cartPage.cartHeading).toBeVisible();
    await expect(this.cartPage.cartHeading).toHaveText(testdata.titles.yourCartpage);
  }

  async removeAllProductsFromCart() {

    await this.homePage.cart.waitFor({ state: 'visible' });
    await this.homePage.cart.click();
  
    await this.homePage.checkOutBtnInCartDialog.waitFor({ state: 'visible' });
    await this.homePage.checkOutBtnInCartDialog.click();
  
    let cartDeleteBtn = this.homePage.cartDeleteBtns; // locator base
  
    while (await cartDeleteBtn.count() > 0) {
      const firstDeleteBtn = cartDeleteBtn.first();
  
      if (await firstDeleteBtn.isVisible()) {
        await firstDeleteBtn.click();
      } else {
        break;
      }
  
      // small re-check after deletion
      await this.page.waitForTimeout(500);
    }
  }

  async SignIndata1() {

    if (await this.homePage.subscribeCancelIcon.isVisible()) {
      await this.homePage.subscribeCancelIcon.click();
    }
  
    if (await this.homePage.newRatingCancelIcon.isVisible()) {
      await this.homePage.newRatingCancelIcon.click();
    }
  
    await this.homePage.email.click();
    await this.homePage.email.fill(testdata.login.newemail4);
  
    await expect(this.homePage.password).toBeVisible();
    await this.homePage.password.click();
    await this.homePage.password.fill(testdata.login.newpassword4);
  
    await expect(this.homePage.signIn).toBeVisible();
    await this.homePage.signIn.click();
  
    if (await this.homePage.newRatingCancelIcon.isVisible()) {
      await this.homePage.newRatingCancelIcon.click();
    }
    
    if (await this.homePage.cancelIconOnPrevCartPopUP.isVisible()) {
      await this.homePage.cancelIconOnPrevCartPopUP.click();
    }
  
    if (await this.homePage.subscribeCancelIcon.isVisible()) {
      await this.homePage.subscribeCancelIcon.click();
    }
  
    await expect(this.accountPage.accountHeading).toBeVisible();
    await expect(this.accountPage.accountHeading).toBe(testdata.titles.newAccHeading);
  
    if (await this.homePage.newRatingCancelIcon.isVisible()) {
      await this.homePage.newRatingCancelIcon.click();
    }
  
    if (await this.homePage.subscribeCancelIcon.isVisible()) {
      await this.homePage.subscribeCancelIcon.click();
    }
  }

  async productPDP() {

    await this.validateBannerText();
    await this.headerLink1();
    await this.ProductlistInSubmenuBybenefits(18);
    await this.ratingPopup();
    await this.page.evaluate(() => window.scrollBy(0, 400));
    await expect(this.homePage.productTitle).toBeVisible({ timeout: 15000 });
    await this.homePage.productTitle.click(); 
    await this.ratingPopup();
  }

  
}