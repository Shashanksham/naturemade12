import { test,expect } from '@playwright/test';
import { testdata } from './constants/testdata';

import { HomePageSteps } from '../tests/steps/homePage.steps';
import { CartPageSteps } from '../tests/steps/cartPage.steps';
import { InformationSteps } from '../tests/steps/information.steps';
import { PaymentSteps } from '../tests/steps/payment.steps';
import { BlogSteps } from './steps/blog.steps';
import { productDetailSteps } from './steps/productDetails.steps';

import { HomePage } from '../tests/pageobjects/homePage';
import { ProductListPage } from './pageobjects/productListPage';
import { ProductDetailsPage } from '../tests/pageobjects/productDetailsPage';
import { InformationPage } from '../tests/pageobjects/informationPage';
import { blogPage } from '../tests/pageobjects/blogPage';
import {paymentPage} from '../tests/pageobjects/paymentPage'
import { cartPage } from '../tests/pageobjects/cartPage';
import { homedir } from 'os';
import { accountPage } from '../tests/pageobjects/accountPage';
import { faqPage} from '../tests/pageobjects/faqPage';
import { TIMEOUT } from 'dns';

test.describe('Home Page Tests', () => {

  let homeSteps;
  test.beforeEach(async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    await homeSteps.launchUrl();

  });

  test("Verify that the 'Accept Cookies' popup is closed when user clicks on 'Accept Cookies/Your Privacy Choices' option on the popup", async ({page}) => {
    const homeSteps = new HomePageSteps(page);
    await homeSteps.validateBannerText();
  });

  test("Verify that the user is navigated to the home page when the company logo in the Home page is clicked", async ({page}) => {
    const homeSteps = new HomePageSteps(page);
    await homeSteps.clickCompanyLogo();
    await homeSteps.validateBannerText();
  });

  test("Verify that the user is navigated to 'Login' page when 'Sign in' button is clicked", async ({page}) => {
    const homeSteps = new HomePageSteps(page);
    await homeSteps.clickSigninLink();
  });

  test("Verify that the product price changes when the user change the bottle count on the product details page", async ({ page }) => {
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
    const productDetailsSteps=new productDetailSteps(page)

    await expect(homePage.searchField).toBeVisible();
    await homePage.searchField.click();
    await homePage.searchField.fill(testdata.productNames.multiGummies);
    await expect(homePage.searchBtn).toBeVisible();
    await homePage.searchBtn.click();
    const product = homePage.searchPageProdImage(2);
    await expect(product).toBeVisible({ timeout: 23000 });
    await product.click({force:true}); 
    const getOneTimePrice = () => page.locator('.rc_widget__price--onetime').first();
    const getSubPrice = () =>  page.locator('.rc-template__legacy-radio .rc_widget__price').nth(1);

  await expect(getOneTimePrice()).toBeVisible();

  const oldPrice = await getOneTimePrice().textContent();
  const oldSubPrice = await getSubPrice().textContent();

  console.log("Old Price:", oldPrice);
  console.log("Old Sub Price:", oldSubPrice);

  await productDetails.productCount1.click({force: true});
  const newPrice = await getOneTimePrice().textContent();
  const newSubPrice = await getSubPrice().textContent();

  console.log("New Price:", newPrice);
  console.log("New Sub Price:", newSubPrice);
    
  });

  test("Verify that the user is logged in successfully when the valid 'Email & Password' is submitted", async ({ page }) => {
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const account = new accountPage(page);   
    await homeSteps.SignIndata1();
    await expect(account.accDetailsOrderHis(1)).toBeVisible();
    await account.accDetailsOrderHis(1).click();
    await expect(account.logoutLink).toBeVisible();
    await account.logoutLink.click();  
    await expect(homePage.whereToBuyLink).toBeVisible();
    await expect(homePage.whereToBuyLink).toBe(testdata.titles.whereToBuyheaderTxt);
  
  });


});

test.describe('Bundles', () => {

  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let cartDetails;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that user is able to place the order with combination of both 'Bundle' and the 'Regular' products", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new ProductListPage(page)
    productDetails=new ProductDetailsPage(page)
    cart=new CartPageSteps(page)
    cartDetails=new cartPage(page)
    info=new InformationSteps(page)
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)

    await homeSteps.clickCompanyLogo();
    await homeSteps.headerLink1();  
    await home.headerSubMenu(6).waitFor({ state: 'visible',timeout: 2000 });
    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      home.headerSubMenu(6).click()
    ]);
    await expect(home.kidsVitamin).toBeVisible({ timeout: 90000 });
    await expect(home.kidsVitamin).toHaveText(testdata.headers.bundles);
    await page.evaluate(() => window.scrollBy(0, 300));
    await productListPage.bundlesInPLPProdTitles(3).waitFor({ state: 'visible',timeout: 15000 });
    await productListPage.bundlesInPLPProdTitles(3).click({force:true,timeout:8000});
    await page.evaluate(() => window.scrollBy(0, 400));
    await productDetails.addToCart.waitFor({state:'visible',timeout:20000 });
    await productDetails.addToCart.click({force:true, timeout:20000});
    await cartDetails.viewMyCartButton.waitFor({state:'visible',timeout:10000})
    await cartDetails.viewMyCartButton.click({force:true, timeout:10000});


    // await productDetails.cartCancelIcon.waitFor({ state: 'visible',timeout: 8000 });
    // await productDetails.cartCancelIcon.click({force:true,timeout:9000});
    await homeSteps.AddtoCart1();
    // await cart.verifyCartPage();
    // await info.informationPage();
    // await Payment.visaCardDetails();
    // await payInfo.payNowButton.waitFor({ state: 'visible' });
    // await payInfo.payNowButton.click();
    // await payInfo.viewOrderConfirmation.waitFor({ state: 'visible' });
    // await payInfo.viewOrderConfirmation.click();
    // await payInfo.thankYouText.waitFor({ state: 'visible' });
    // const thankYouTest = (await payInfo.thankYouText.textContent()).trim();
    // expect(thankYouTest).toBe(testdata.paymentPageDetails.thankYouTxt);
  });

  test('Verify that the validation message is displayed when the user tries to apply coupon code for the bundle product', async ({page}) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new ProductListPage(page)
    productDetails=new ProductDetailsPage(page)
    cart=new CartPageSteps(page)
    info=new InformationSteps(page)
    information=new InformationPage(page)
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)

    await homeSteps.clickCompanyLogo();  
    await homeSteps.headerLink1(); 
    await home.headerSubMenu(6).waitFor({ state: 'visible' });
    await home.headerSubMenu(6).click(); 
    await productListPage.bundlesInPLP_ProdTitles(3).scrollIntoViewIfNeeded();  
    await productListPage.bundlesInPLP_ProdTitles(3).waitFor({ state: 'visible' });
    await productListPage.bundlesInPLP_ProdTitles(3).dblclick();
    await productDetails.addToCart.waitFor({ state: 'visible' });
    await productDetails.addToCart.click();  
    await productDetails.viewMyCart.waitFor({ state: 'visible' });
    await productDetails.viewMyCart.click(); 
    await productDetails.viewMyCart.scrollIntoViewIfNeeded();   
    await cart.verifyCartPage(); 
    await information.discountfield.waitFor({ state: 'visible' });
    await information.discountfield.click();
    await information.discountfield.fill(testdata.information.couponcode);
    await information.applyBtn.waitFor({ state: 'visible' });
    await information.applyBtn.click();
    await information.discountValidationMsg.waitFor({ state: 'visible' });
    const message = (await information.discountValidationMsg.textContent()).trim();
    await expect(message).toBe(testdata.informationpage.discountValidationMsg);
  });

  test("Verify that the bundle product is removed and the `Empty Cart Page` is displayed when the user clicks the `click here` link in the validation message", async ({page}) =>{
    home=new HomePage(page)
    information=new InformationPage(page)
    await information.discountValidationMsgClickHere.waitFor({ state: 'visible' });
    await information.discountValidationMsgClickHere.click();
    await home.emptyCartPage.waitFor({ state: 'visible' });  
    const text = (await home.emptyCartPage.textContent()).trim();
    await expect(text).toBe(testdata.titles.yourCartisEmpty);    
  })

  test('Verify that the user can purchase a bundle (3 products ) at a discounted price compared to buying the 3 products seperately', async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new ProductListPage(page)
    productDetails=new ProductDetailsPage(page)
    cart=new CartPageSteps(page)
    info=new InformationSteps(page)
    information=new InformationPage(page)
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)

    await homeSteps.clickCompanyLogo();
    await homeSteps.headerLink1();
    await home.headerSubMenu(6).waitFor({ state: 'visible' });
    await home.headerSubMenu(6).click();
    await productListPage.bundlesInPLP_ProdTitles(3).scrollIntoViewIfNeeded();
    await productListPage.bundlesInPLP_ProdTitles(3).dblclick();
    await productDetails.bundlesAddToCartBtn.waitFor({ state: 'visible' });
    await productDetails.bundlesAddToCartBtn.click();
    await productDetails.viewMyCart.waitFor({ state: 'visible' });
    await productDetails.viewMyCart.click();
    await cart.verifyCartPage(); 
    await expect(information.contactHeading).toHaveText(testdata.informationpage.contctInfrmtionnHeading);
    await info.informationPage();
    await information.continueToPaymentBtn.waitFor({ state: 'visible' });
    await information.continueToPaymentBtn.click();
    await homeSteps.clickCompanyLogo();

  });

  test('Verify that the descriptions of all 3 child products are displayed in Benefits section', async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page)
    productDetails=new ProductDetailsPage(page)
    cart=new CartPageSteps(page)
    info=new InformationSteps(page)
    information=new InformationPage(page)
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)

    await blogoSteps.clickCompanyLogo();
    await homeSteps.headerLink1();
    await home.headerSubMenu(6).waitFor({ state: 'visible' });
    await home.headerSubMenu(6).click();
    const productTitle = (await home.kidsVitamin.textContent()).trim();
    await expect(productTitle).toBe(testdata.headers.bundelstitle);
    await productListPage.collectionJumpLink(1).waitFor({ state: 'visible' });
    await productListPage.collectionJumpLink(1).click();
    await productListPage.bundlesInPLP_BuynowBtns(3).waitFor({ state: 'visible' });
    await productListPage.bundlesInPLP_BuynowBtns(3).dblclick();
    await productDetails.productName.waitFor({ state: 'visible' });
    await productDetails.benefitHeading.waitFor({ state: 'visible' });
    const dropdownName = (await productDetails.bundlesDropdownName.textContent()).trim();
    await expect(dropdownName).toBe(testdata.informationpage.ultraOmegaSoftgels);
    const desc1 = (await productDetails.bundleDescription(1).textContent()).trim();
    await expect(desc1).toBe(testdata.productDetailsPage.bundleDescription1);

    await productDetails.bundlesDropdownName.click();
    await productDetails.bundlesList(1).click();
    const desc1Updated = (await productDetails.bundleDescription(1).textContent()).trim();
    await expect(desc1Updated).toBe(testdata.productDetailsPage.bundleDescription1);

    await productDetails.bundlesDropdownName.click();
    await productDetails.bundlesList(2).click();
    const desc2 = (await productDetails.bundleDescription(2).textContent()).trim();
    await expect(desc2).toBe(testdata.productDetailsPage.bundleDescription2);

    await productDetails.bundlesDropdownName.click();
    await productDetails.bundlesList(3).click();
    const desc3 = (await productDetails.bundleDescription(3).textContent()).trim();
    await expect(desc3).toBe(testdata.productDetailsPage.bundleDescription3);
  })

  test("Verify that the `OTP` & `S&S` sections are not displayed on the bundle PDP", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page)
    productDetails=new ProductDetailsPage(page)
    cart=new CartPageSteps(page)
    info=new InformationSteps(page)
    information=new InformationPage(page)
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)

    await blogoSteps.clickCompanyLogo();
    await homeSteps.headerLink1()
    await home.headerSubMenu(6).waitFor({ state: 'visible' });
    await home.headerSubMenu(6).click();
    const productTitle = await home.kidsVitamin.textContent();
    expect(productTitle).toBe(testdata.headers.bundelstitle);
    await productListPage.collectionJumpLink(1).waitFor({ state: 'visible' });
    await productListPage.collectionJumpLink(1).click();
    await productListPage.bundlesInPLP_BuynowBtns(2).waitFor({ state: 'visible' });
    await productListPage.bundlesInPLP_BuynowBtns(2).dblclick();
    await expect(productDetails.onetimeradiopurchase).toBeHidden();
    await expect(productDetails.subscribesavetenpercentradioPurchase).toBeHidden();
  });

  test("Verify that the bundle product `Price` and the `Value` are identical on both `Product Details` page and the `Cart` page", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page)
    productDetails=new ProductDetailsPage(page)
    cart=new CartPageSteps(page)
    cartDetails=new cartPage(page)
    info=new InformationSteps(page)
    information=new InformationPage(page)
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)

    await blogoSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await blogoSteps.clickCompanyLogo(); 
    await homeSteps.headerLink1()
    await home.headerSubMenu(6).waitFor({ state: 'visible' });
    await home.headerSubMenu(6).click();
    const productTitle = await home.kidsVitamin.textContent();
    expect(productTitle).toBe(testdata.headers.bundelstitle);
    await productListPage.collectionJumpLink(1).waitFor({ state: 'visible' });
    await productListPage.collectionJumpLink(1).click();
    await page.waitForTimeout(2000); 
    await productListPage.bundlesInPLP_BuynowBtns(3).waitFor({ state: 'visible' });
    await productListPage.bundlesInPLP_BuynowBtns(3).dblclick();
    await page.evaluate(() => window.scrollBy(0, 300));
    await expect(productDetails.bundlePrice).toBeVisible();
    expect(await productDetails.bundlePrice.textContent()).toBe(testdata.productDetailsPage.bundlePrice);

    await expect(productDetails.bundleCompPrice).toBeVisible();
    expect(await productDetails.bundleCompPrice.textContent()).toBe(testdata.productDetailsPage.bundleCompPrice);
    await productDetails.addToCart.click();
    await productDetails.viewMyCart.click();
    await expect(cartDetails.cartBundlePrice).toBeVisible();
    expect(await cartDetails.cartBundlePrice.textContent()).toBe(testdata.productDetailsPage.bundlePrice);

    await expect(cartDetails.cartBundleCompPrice).toBeVisible();
    expect(await cartDetails.cartBundleCompPrice.textContent()).toBe(testdata.productDetailsPage.bundleCompPrice);

    await expect(cartDetails.cartTotalPrice).toBeVisible();
    expect(await cartDetails.cartTotalPrice.textContent()).toBe(testdata.productDetailsPage.bundlePrice1);
  });

  test("Verify that the user is navigated to the child product pages when user clicks on the links beneath the description", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page)
    productDetails=new ProductDetailsPage(page)
    cart=new CartPageSteps(page)
    cartDetails=new cartPage(page)
    info=new InformationSteps(page)
    information=new InformationPage(page)
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)

    await homeSteps.clickCompanyLogo();
    await homeSteps.headerLink1();
    await home.headerSubMenu(5).waitFor({ state: 'visible' });
    await home.headerSubMenu(5).click();
    await page.evaluate(() => window.scrollBy(0, 100));
    await productListPage.bundlesInPLP_ProdTitles(2).waitFor({ state: 'visible' });
    await productListPage.bundlesInPLP_ProdTitles(2).dblclick();
    await page.waitForTimeout(2000); 
    await page.evaluate(() => window.scrollBy(0, 600));
    await expect(productDetails.bulletedLinkstext(1)).toBeVisible();
    const childProdLinkName = await productDetails.bulletedLinkstext(1).textContent();
    await productDetails.bulletedLinkstext(1).click();
    await expect(productDetails.productName).toBeVisible();
    const childProdName = await productDetails.productName.textContent();
    expect(childProdLinkName.trim()).toBe(childProdName.trim());
  });

});

test.describe('Header 1 Subheader 1', () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    // productListPage = new productListPage(page);
    // productDetails = new ProductDetailsPage(page);
    // cart = new CartPageSteps(page);
    // information = new InformationPage(page);
    // Payment=new PaymentSteps(page)
    // payInfo=new paymentPage(page)
    // info = new InformationSteps(page);
    // blog=new blogPage(page);
    // blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that the submenus links are displayed when user clicks on 'product' menu", async ({ page }) => {
    const homeSteps = new HomePageSteps(page);
    const home=new HomePage(page)
    await homeSteps.clickCompanyLogo();
    await home.headerLinks(1).waitFor({ state: 'visible',timeout: 5000 });
    await homeSteps.headerLink1()
    await homeSteps.validationForProductHeaderSubmenu();
  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'A' links in the 'A to Z' submenu", async ({ page }) => {
   
    const homeSteps=new HomePageSteps(page)
    await homeSteps.headerLink1()
    await homeSteps.productListInSubmenuAtoZ(1,2,testdata.headers.adultgummies)
    await homeSteps.headerLink1()
    await homeSteps.productListInSubmenuAtoZ(1,3,testdata.headers.advancemulties)
    await homeSteps.headerLink1()
    await homeSteps.productListInSubmenuAtoZ(1,4,testdata.headers.Ashwagandha)
})

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'B' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    await homeSteps.productListInSubmenuAtoZ(2,2,testdata.headers.bvitamins)
    await homeSteps.productListInSubmenuAtoZ(2,3,testdata.headers.bcomplex)
    await page.waitForTimeout(8000);
    await homeSteps.productListInSubmenuAtoZ(2,5,testdata.headers.biotin)

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'C' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. C Vitamins ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(3, 2);
    await expect(item).toBe(testdata.headers.cvitamins);

    // ---------- 2. Calcium ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(3, 3);
    await expect(item).toBe(testdata.headers.calcium);

    // ---------- Back to Home ----------
    const logo = home.cmpnyLogo;

    await expect(logo).toBeVisible();

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      logo.click()
    ]);

    // ---------- 4. Cholestoff ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(3, 4);
    await expect(item).toBe(testdata.headers.cholestoff);

    // ---------- 5. Choline ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(3, 5);
    await expect(item).toBe(testdata.headers.choline);

      // ---------- 6. Collagen ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(3,6);
    await expect(item).toBe(testdata.headers.biotin);

    // ---------- 7. Coq10 ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(3, 7);
    await expect(item).toBe(testdata.headers.coQ10);

    // ---------- 8. Cranberry ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(3,8);
    await expect(item).toBe(testdata.headers.cranberry);
  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'D' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);
    const pdp=new ProductDetailsPage(page)

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. D Vitamins ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(4, 2);
    await expect(item).toBe(testdata.headers.dvitamins);

    // ---------- 2. Diabetes Health Pack ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(4, 3);
    await expect(pdp.productName)
    .toHaveText(testdata.headers.diabeteshealthpack);

    // ---------- Back to Home ----------
    const logo = home.cmpnyLogo;

    await expect(logo).toBeVisible();

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      logo.click()
    ]);
  })

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'E' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. E Vitamins ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(5, 2);
    await expect(item).toBe(testdata.headers.evitamins);

    // ---------- 2. Elderberry ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(5, 3);
    await expect(item).toBe(testdata.headers.elderberry);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'F' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Fish Oil & Omega-3 ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(6, 2);
    await expect(item).toBe(testdata.headers.fishoilomega);

    // ---------- 2. Flaxseed Oil ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(6,3);
    await expect(item).toBe(testdata.headers.flaxseedoil);

    // ---------- 3. Folic Acid ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(6, 4);
    await expect(item).toBe(testdata.headers.folicAcid);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'G' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);
    const pdp=new ProductDetailsPage(page)

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Ginseng ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(7, 2);
    await expect(item).toBe(testdata.headers.ginseng);

    // ---------- 2. GLP-1 Nutritional Support ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(7,3);
    await expect(item).toBe(testdata.headers.glpNutritionSupport);

    // ---------- 3. Glucosamine ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(7, 4);
    await expect(pdp.productName)
    .toHaveText(testdata.headers.glucosamineChondroitin);

    // ---------- Back to Home ----------
    const logo = home.cmpnyLogo;

    await expect(logo).toBeVisible();

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      logo.click()
    ]);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'H' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. 5-HTP ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(8, 2);
    await expect(item).toBe(testdata.headers.htp);

    // ---------- 2. Hair,Skin & nails----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(8,3);
    await expect(item).toBe(testdata.headers.hairSkinNails);

    // ---------- 3. Herbs ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(8, 4);
    await expect(item).toBe(testdata.headers.herbs);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'I' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Iron ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(9, 2);
    await expect(item).toBe(testdata.headers.iron);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'K' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. K Vitamins ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(10, 2);
    await expect(item).toBe(testdata.headers.kvitamins);

    // ---------- 2. Kids First Gummies ----------
    await headerLink.hover();

     item = homeSteps.productListInSubmenuAtoZ(10, 3);
    await expect(item).toBe(testdata.headers.kidsfirstgummies);


    // ---------- 3. Kids Multivitamins ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(10, 3);
    await expect(item).toBe(testdata.headers.kidsmultivitamins);


  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'L' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1.L-Lysine ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(11, 2);
    await expect(item).toBe(testdata.headers.lysine);

    // ---------- 2. L-Theanine ----------
    await headerLink.hover();

     item = homeSteps.productListInSubmenuAtoZ(11, 3);
    await expect(item).toBe(testdata.headers.theanine);


    // ---------- 3. Lutein ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(11, 4);
    await expect(item).toBe(testdata.headers.lutein);


  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'M' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1.Magnessium ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(12, 2);
    await expect(item).toBe(testdata.headers.magnesium);

    // ---------- 2. Melatonin ----------
    await headerLink.hover();

     item = homeSteps.productListInSubmenuAtoZ(12, 3);
    await expect(item).toBe(testdata.headers.melatonin);


    // ---------- 3. Mens multivitamins ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(12, 4);
    await expect(item).toBe(testdata.headers.mensmultivitamins);

    // ---------- 4. Minerals ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(12, 5);
    await expect(item).toBe(testdata.headers.minerals);

    // ---------- 5. Multivitamins ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(12, 6);
    await expect(item).toBe(testdata.headers.multivitamins);

    // ---------- 5. Multi advanced ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(12, 7);
    await expect(item).toBe(testdata.headers.multivitamins);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'O' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Omega Supplements ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(13, 2);
    await expect(item).toBe(testdata.headers.omega3supplements);

    // ---------- 2. Triple omega supplements ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(13, 3);
    await expect(item).toBe(testdata.headers.tripleOmega);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'P' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1.Potassium ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(14, 2);
    await expect(item).toBe(testdata.headers.potassium);

    // ---------- 2. Prebiotic SUpplements ----------
    await headerLink.hover();

     item = homeSteps.productListInSubmenuAtoZ(14, 3);
    await expect(item).toBe(testdata.headers.prebiotics);


    // ---------- 3.Prenatal and Postnatal Supplements ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(14, 4);
    await expect(item).toBe(testdata.headers.prenatalandPostnatal);

    // ---------- 4. Probiotics ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(14, 5);
    await expect(item).toBe(testdata.headers.probiotics);

     // ---------- Back to Home ----------
     const logo = home.cmpnyLogo;

     await expect(logo).toBeVisible();
 
     await Promise.all([
       page.waitForLoadState('domcontentloaded'),
       logo.click()
     ]);

    

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'S' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Sam-E Supplements ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(15, 2);
    await expect(item).toBe(testdata.headers.samE);

    // ---------- 2. Supplements ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(15, 3);
    await expect(item).toBe(testdata.headers.supplements);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'T' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);
    const productDetails=new ProductDetailsPage(page)

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Glucosamine PDP ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(16, 2);
    await expect(productDetails.productName).toBe(testdata.headers.glucosamineChondroitin);

    // ---------- Back to Home ----------
    const logo = home.cmpnyLogo;

    await expect(logo).toBeVisible();

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      logo.click()
    ]);

    // ---------- 2. Triple Omega ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(16, 3);
    await expect(item).toBe(testdata.headers.tripleOmega);

     // ---------- 2. Turmeric Curcumin ----------
     await headerLink.hover();

     item = homeSteps.productListInSubmenuAtoZ(16, 4);
     await expect(item).toBe(testdata.headers.turmericCurcumin);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'V' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);
    const productDetails=new ProductDetailsPage(page)

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Valerian Root ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(17, 2);
    await expect(item).toBe(testdata.headers.valerianroot);

    // ---------- Back to Home ----------
    const logo = home.cmpnyLogo;

    await expect(logo).toBeVisible();

    await Promise.all([
      page.waitForLoadState('domcontentloaded'),
      logo.click()
    ]);

    // ---------- 2. Vitamin B ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(17, 3);
    await expect(item).toBe(testdata.headers.vitaminB);

     // ---------- 3. Vitamin C ----------
     await headerLink.hover();

     item = homeSteps.productListInSubmenuAtoZ(17, 4);
     await expect(item).toBe(testdata.headers.vitaminC);

      // ---------- 3. Vitamin D ----------
      await headerLink.hover();

      item = homeSteps.productListInSubmenuAtoZ(17, 5);
      await expect(item).toBe(testdata.headers.vitaminD);

      // ---------- 4. Vitamin E ----------
      await headerLink.hover();

      item = homeSteps.productListInSubmenuAtoZ(17, 6);
      await expect(item).toBe(testdata.headers.vitaminE);

      // ---------- 4. Vitamin K ----------
      await headerLink.hover();

      item = homeSteps.productListInSubmenuAtoZ(17, 7);
      await expect(item).toBe(testdata.headers.vitaminK);

  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'W' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);
    const productDetails=new ProductDetailsPage(page)

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Wellblends ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(18, 2);
    await expect(item).toBe(testdata.headers.wellblends);

    // ---------- 2. Women's multivitamins ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(18, 3);
    await expect(item).toBe(testdata.headers.womensmultivitamins);

  
  });

  test("Verify that the appropriate products list pages are displayed when user clicks on the 'Z' links in the 'A to Z' submenu", async ({ page }) => {

    const home = new HomePage(page);
    const homeSteps = new HomePageSteps(page);
    const productDetails=new ProductDetailsPage(page)

    const headerLink = home.headerLinks(1);
    await expect(headerLink).toBeVisible();

    // ---------- 1. Zero Sugar Gummies ----------
    await headerLink.hover();

    let item = homeSteps.productListInSubmenuAtoZ(19, 2);
    await expect(item).toBe(testdata.headers.zerosugargummies);

    // ---------- 2. Zinc ----------
    await headerLink.hover();

    item = homeSteps.productListInSubmenuAtoZ(19, 3);
    await expect(item).toBe(testdata.headers.zinc);

  
  });

  })

test.describe('Header 1 Subheader 2 (First 9 option)', () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the appropriate options are displayed when the user clicks on the 'By Benefits' header submenu", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)

    await homeSteps.headerLink1();

    await expect(home.productsHeadersubmenus(2)).toBeVisible();
    await home.productsHeadersubmenus(2).click();

    await expect(home.byBenefitsSubmenuLinks(1)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(2)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(3)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(4)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(5)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(6)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(7)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(8)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(9)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(10)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(11)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(12)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(13)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(14)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(15)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(16)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(17)).toBeVisible();
    await expect(home.byBenefitsSubmenuLinks(18)).toBeVisible();

  });

  test("Verify that the user is navigated to 'Beauty' product list when 'Beauty' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    await homeSteps.headerLink1();
    await homeSteps.ProductlistInSubmenuBybenefits(1);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.beauty);
  
  });

  test("Verify that the user is navigated to 'Bone Health' product list when 'Bone' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(2);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.bonehealth);
  
  });

  test("Verify that the user is navigated to 'Brain Health' product list when 'Brain' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();
    await homeSteps.ProductlistInSubmenuBybenefits(3);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.brainhealth);
  
  });

  test("Verify that the user is navigated to 'Gut Health' product list when 'Gut Health' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(4);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.gutHealth);
  
  });

  test("Verify that the user is navigated to 'Energy' product list when 'Energy' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();
   
    await homeSteps.ProductlistInSubmenuBybenefits(5);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.energy);
  
  });

  test("Verify that the user is navigated to 'Eye Health' product list when 'Eye Health' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(6);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.eyehealth);
  
  });

  test("Verify that the user is navigated to 'General Wellness' product list when 'General Wellness' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(7);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.wellness);
  
  });
}) 

test.describe('Header 1 Subheader 2 (Last 9 option)', () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the user is navigated to 'Healthy Aging' product list when 'Healthy Aging' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(8);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.healthAging);
  
  });

  test("Verify that the user is navigated to 'Heart' product list when 'Heart' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(9);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.heart);
  
  });

  test("Verify that the user is navigated to 'Immune Health' product list when 'Immune Health' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(10);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.immunehealth);
  
  });

  test("Verify that the user is navigated to 'Joints' product list when 'Joints' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(11);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.joints);
  
  });


  test("Verify that the user is navigated to 'Kids' product list when 'Kids' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page);
    await homeSteps.headerLink1();


    await homeSteps.ProductlistInSubmenuBybenefits(12);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.kids);
  
  });

  test("Verify that the user is navigated to 'Men's health' product list when 'Men's health' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page)
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(13);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.kids);
  
  });

  test("Verify that the user is navigated to 'Mood' product list when 'Mood' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(14);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.mood);
  
  });

  test("Verify that the user is navigated to 'Prenatal & Postnatal' product list when 'Prenatal & Postnatal' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page)
    await homeSteps.ProductlistInSubmenuBybenefits(15);
    await homeSteps.headerLink1();

  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.prenatalAndPostnatalTxt);
  });
}) 

test.describe('Header 1 Subheader 2 (Marketing Card)', () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the user is navigated to 'Sleep' product list when 'Sleep' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(16);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.sleep);
  });

  test("Verify that the user is navigated to 'Stress' product list when 'Stress' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(17);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.stress);
  });

  test("Verify that the user is navigated to 'Womens's health' product list when 'Women's health' option is clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);
    await homeSteps.headerLink1();

    await homeSteps.ProductlistInSubmenuBybenefits(18);
  
    const productTitle = home.kidsVitamin;
  
    await expect(productTitle).toHaveText(testdata.healthNeedsdata.womenshealth);
  });

  test("Verify that the user is redirected to the `What Do I Need?` page when the `Discover`image and `Get Started Now` link is clicked in the `By Benefits` dropdown", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);
    await homeSteps.headerLink1();

    await expect(home.productsHeadersubmenus(2)).toBeVisible();
    await home.productsHeadersubmenus(2).click();

    await expect(productListPage.getStartedImage).toBeVisible();
    await Promise.all([
      page.waitForLoadState('networkidle'),
      productListPage.getStartedImage.click()
    ]);

    await expect(home.kidsVitamin).toHaveText(testdata.headers.whatdoineed);

    await homeSteps.headerLink1();
    await expect(home.productsHeadersubmenus(2)).toBeVisible();
    await home.productsHeadersubmenus(2).click();

    await expect(productListPage.getStartedNow).toBeVisible();
    await Promise.all([
      page.waitForLoadState('networkidle'),
      productListPage.getStartedNow.click()
    ]);

    await expect(home.kidsVitamin).toHaveText(testdata.headers.whatdoineed);

  });

  test("Verify that the user is redirected to the `The Daily 4tm` page when the user clicks the marketing card on the `Gut health` product section", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);
    await homeSteps.headerLink1();
    await homeSteps.ProductlistInSubmenuBybenefits(4);
  
    await expect(home.newBannerTitle).toHaveText(testdata.healthNeedsdata.gutHealthAndDigestion);
  
    await productListPage.marketingCard.scrollIntoViewIfNeeded();
  
    await expect(productListPage.marketingCard).toBeVisible();
  
  });


}) 

test.describe("Header 1 Subheader 3", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the appropriate options are displayed when user clicks on 'Gummies' submenu", async ({ page }) => {
    
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);

    await homeSteps.headerLink1();
    await expect(home.productsHeadersubmenus(3)).toBeVisible();
    await home.productsHeadersubmenus(3).click();

    await expect(home.gummiesHeaderLink(1)).toBeVisible();
    await expect(home.gummiesHeaderLink(2)).toBeVisible();
    await expect(home.gummiesHeaderLink(3)).toBeVisible();

  });

  test("Verify that the user is redirected to the appropriate collection page when the gummies submenus are clicked", async ({ page }) => {
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);

    // --- 1. Adult Gummies ---
    await expect(home.gummiesHeaderLink(1)).toBeVisible();
    await Promise.all([
      page.waitForLoadState('networkidle'),
      home.gummiesHeaderLink(1).click()
    ]);
  
    await expect(home.kidsVitamin).toHaveText(testdata.headers.adultgummies);
  
    // --- 2. Kids Gummies ---
    await homeSteps.headerLink1();
    await expect(home.productsHeadersubmenus(3)).toBeVisible();
    await home.productsHeadersubmenus(3).click();
  
    await expect(home.gummiesHeaderLink(2)).toBeVisible();
    await Promise.all([
      page.waitForLoadState('networkidle'),
      home.gummiesHeaderLink(2).click()
    ]);
  
    await expect(home.kidsVitamin)
      .toHaveText(testdata.headers.kidsfirstgummies);
  
    // --- 3. Zero Sugar Gummies ---
    await homeSteps.headerLink1();
    await expect(home.productsHeadersubmenus(3)).toBeVisible();
    await home.productsHeadersubmenus(3).click();
  
    await expect(home.gummiesHeaderLink(3)).toBeVisible();
    await Promise.all([
      page.waitForLoadState('networkidle'),
      home.gummiesHeaderLink(2).click()
    ]);
  
    await expect(home.kidsVitamin).toHaveText(testdata.headers.zerosugargummies);
  
  });

});

test.describe("BestSeller submenu", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the 'Best Seller' Products are displayed in the header dropdown when 'Best Sellers' submenu is clicked", async ({ page }) => {

    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);
    await homeSteps.headerLink1()

    await expect(home.productsHeadersubmenus(4)).toBeVisible();
    await home.productsHeadersubmenus(4).click();

    await expect(home.bestSellerProdImg(1)).toBeVisible();
    await Promise.all([
      page.waitForLoadState('networkidle'),
      home.bestSellerProdImg(1).click()
    ]);

    await expect(home.pdpBadge).toHaveText(testdata.headers.bestSellerBadgeTxt1);
  })

  test("Verify that the user is redirected to the appropriate product details page when the product image, title and button are clicked", async ({ page }) => {
    
    homeSteps = new HomePageSteps(page);
    home=new HomePage(page)
    productListPage=new productListPage(page);
    productDetails=new ProductDetailsPage(page)
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await blogoSteps.clickCompanyLogo();
  
    await homeSteps.headerLink1()

    await expect(home.productsHeadersubmenus(4)).toBeVisible();
    await home.productsHeadersubmenus(4).click();
  
    await expect(home.bestSellerProdTitle(1)).toBeVisible();
    const title1 = await home.bestSellerProdTitle(1).textContent();
  
    await expect(home.bestSellerProdImg(1)).toBeVisible();
    await Promise.all([
      page.waitForLoadState('networkidle'),
      home.bestSellerProdImg(1).click()
    ]);
  
    await homeSteps.ratingPopup();
  
    await expect(productDetails.productName).toHaveText(title1);
  
    await home.headerLinks(1).click();
    await expect(home.productsHeadersubmenus(4)).toBeVisible();
    await home.productsHeadersubmenus(4).click();
  
    await homeSteps.ratingPopup();
  
    await expect(home.bestSellerProdTitle(1)).toBeVisible();
    const title2 = await home.bestSellerProdTitle(1).textContent();
  
    await Promise.all([
      page.waitForLoadState('networkidle'),
      home.bestSellerProdTitle(1).click()
    ]);
  
    await expect(productDetails.productName).toHaveText(title2);
  
    await home.headerLinks(1).click();
    await expect(home.productsHeadersubmenus(4)).toBeVisible();
    await home.productsHeadersubmenus(4).click();
  
    await homeSteps.ratingPopup();
  
    await expect(home.bestSellerProdTitle(1)).toBeVisible();
    const title3 = await home.bestSellerProdTitle(1).textContent();
  
    await expect(home.bestSellerBuyNowBtn(1)).toBeVisible();
    await Promise.all([
      page.waitForLoadState('networkidle'),
      home.bestSellerBuyNowBtn(1).click()
    ]);
  
    await expect(productDetails.productName).toHaveText(title3);

  })

  test("Verify that the user is redirected to the 'Best seller' products page when the 'View all best seller' link is clicked", async ({ page }) => {
  
    const homePage = new HomePage(page);
  
    await homePage.headerLinks(1).waitFor();
    await homePage.headerLinks(1).click();
  
    await homePage.productsHeadersubmenus(4).waitFor();
    await homePage.productsHeadersubmenus(4).click();
  
    await homePage.viewAllBestSellerLink.waitFor();
    await homePage.viewAllBestSellerLink.click();
  
    await homePage.kidsVitamin.waitFor();
  
    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();
  
    await expect(productTitleInBybenefits2).toBe(testdata.headers.bestSellers);
  });

  });

test.describe("Header 1 submenu5", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the 'Bundles' page is displayed when 'Bundle & save' submenu is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page)

    await expect(homePage.headerLinks(1)).toBeVisible();
    await homePage.headerLinks(1).click();

    await homeSteps.ratingPopup();

    await expect(homePage.headerSubMenu(7)).toBeVisible();
    await homePage.headerSubMenu(7).click();

    await expect(homePage.kidsVitamin).toBeVisible();

    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();

    await expect(productTitleInBybenefits2.trim()).toBe(testdata.he.bundelstitle);
  });

  test("Verify that the 'Subscriptions' page is displayed when 'Subscribe & Save' submenu is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page)

    await expect(homePage.headerLinks(1)).toBeVisible();
    await homePage.headerLinks(1).click();

    await homeSteps.ratingPopup();

    await expect(homePage.headerSubMenu(6)).toBeVisible();
    await homePage.headerSubMenu(6).click();

    await expect(homePage.kidsVitamin).toBeVisible();

    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();

    await expect(productTitleInBybenefits2.trim()).toBe(testdata.heading.marketingSubsPgHeading);
  });
});

test.describe("Search", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

test("Verify that relevant products are displayed in the Search Suggestion popup when the user starts entering the product name in the search field", async ({ page }) => {

  const homePage = new HomePage(page);
  const homeSteps=new HomePageSteps(page)

  await homeSteps.clickCompanyLogo();

  await expect(homePage.searchField).toBeVisible();

  await homePage.searchField.click();
  await homePage.searchField.fill(testdata.searchbar.biotin);

  await expect(homePage.searchTitleDropdown(1)).toBeVisible();
  const prodname1 = await homePage.searchTitleDropdown(1).textContent();
  expect(prodname1.trim()).toBe(testdata.productNames.maximumStrengthBiotin1);

  await expect(homePage.searchTitleDropdown(3)).toBeVisible();
  const prodname3 = await homePage.searchTitleDropdown(3).textContent();
  expect(prodname3.trim()).toBe(testdata.productNames.maximumStrengthBiotin);

  await expect(homePage.searchTitleDropdown(2)).toBeVisible();
  const prodname2 = await homePage.searchTitleDropdown(2).textContent();
  expect(prodname2.trim()).toBe(testdata.productNames.biotin1000mcgsoftgels);
});

test("Verify that user can search a product using product item number", async ({ page }) => {

  const homePage = new HomePage(page);
  const homeSteps=new HomePageSteps(page)
  const productDetails = new ProductDetailsPage(page);

  await homeSteps.clickCompanyLogo();

  await expect(homePage.searchField).toBeVisible();

  await homePage.searchField.click();

  await homePage.searchField.fill(testdata.productDetailsPage.itemnumber);

  await expect(homePage.searchBtn).toBeVisible();
  await homePage.searchBtn.click();

  await expect(homePage.searchResult).toBeVisible();

  const searchresult = await homePage.searchResult.textContent();
  expect(searchresult.trim()).toBe(testdata.productDetailsPage.itemnumber);

  await expect(productDetails.searchPageProdTitle(2)).toBeVisible();

  const prodname = await productDetails.searchPageProdTitle(2).textContent();
  expect(prodname.trim()).toBe(testdata.healthNeedsdata.advancemultivitamin);
});

test("Verify that the search results page is displayed when the user clicks the Magnifying glass icon after entering the product name in the search field", async ({ page }) => {

  const homePage = new HomePage(page);
  const homeSteps=new HomePageSteps(page)
  const productDetails = new ProductDetailsPage(page);

  await homeSteps.clickCompanyLogo();

  await expect(homePage.searchField).toBeVisible();

  await homePage.searchField.click();

  await homePage.searchField.fill(testdata.searchbar.vitamins);

  await expect(homePage.searchBtn).toBeVisible();
  await homePage.searchBtn.click();

  await expect(homePage.searchResult).toBeVisible();

  const searchresult = await homePage.searchResult.textContent();
  expect(searchresult.trim()).toBe(testdata.searchbar.vitamins);

  // Product 9
  await expect(productDetails.searchPageProdTitle(9)).toBeVisible();
  const prodname9 = await productDetails.searchPageProdTitle(9).textContent();
  expect(prodname9.trim()).toBe(testdata.productNames.magnesiumLThreonate);

  // Product 7
  await expect(productDetails.searchPageProdTitle(7)).toBeVisible();
  const prodname7 = await productDetails.searchPageProdTitle(7).textContent();
  expect(prodname7.trim()).toBe(testdata.headers.glucosamineChondroitin1);

  // Product 8
  await expect(productDetails.searchPageProdTitle(8)).toBeVisible();
  const prodname8 = await productDetails.searchPageProdTitle(8).textContent();
  expect(prodname8.trim()).toBe(testdata.productNames.vitD3PlusK2Softgels);

  // Product 10
  await expect(productDetails.searchPageProdTitle(10)).toBeVisible();
  const prodname10 = await productDetails.searchPageProdTitle(10).textContent();
  expect(prodname10.trim()).toBe(testdata.productNames.vitaminC);

});

test("Verify that the pre-suggested search terms are displayed when the search text field is clicked", async ({ page }) => {

  const homePage = new HomePage(page);
  const homeSteps=new HomePageSteps(page);

  await homeSteps.clickCompanyLogo();

  await expect(homePage.searchField).toBeVisible();
  await homePage.searchField.click();

  await expect(homePage.preSuggestedSearch(1)).toBeVisible();
  await expect(homePage.preSuggestedSearch(1)).toBe(testdata.searchDropdown.startYourRoutine);

  await expect(homePage.preSuggestedSearch(2)).toBeVisible();
  await expect(homePage.preSuggestedSearch(2)).toBe(testdata.searchDropdown.womensHealth);

  await expect(homePage.preSuggestedSearch(3)).toBeVisible();
  await expect(homePage.preSuggestedSearch(3)).toBe(testdata.searchDropdown.mensHealth);

  await expect(homePage.preSuggestedSearch(4)).toBeVisible();
  await expect(homePage.preSuggestedSearch(4)).toBe(testdata.searchDropdown.whatShouldITake);

  await expect(homePage.preSuggestedSearch(5)).toBeVisible();
  await expect(homePage.preSuggestedSearch(5)).toBe(testdata.searchDropdown.gummies);

  await expect(homePage.preSuggestedSearch(6)).toBeVisible();
  await expect(homePage.preSuggestedSearch(6)).toBe(testdata.searchDropdown.whatShouldITake);

  await expect(homePage.preSuggestedSearch(7)).toBeVisible();
  await expect(homePage.preSuggestedSearch(7)).toBe(testdata.searchDropdown.multivitamins);

  await expect(homePage.preSuggestedSearch(8)).toBeVisible();
  await expect(homePage.preSuggestedSearch(8)).toBe(testdata.searchDropdown.bestSellers);

  await expect(homePage.preSuggestedSearch(9)).toBeVisible();
  await expect(homePage.preSuggestedSearch(9)).toBe(testdata.searchDropdown.coupons);

  await expect(homePage.preSuggestedSearch(10)).toBeVisible();
  await expect(homePage.preSuggestedSearch(10)).toBe(testdata.searchDropdown.health);

});


});

test.describe("Find Vitamins For Me", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the 'What Do I Need' page is displayed when 'What Do I Need' submenu is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    productListPage = new productListPage(page);

    await expect(homePage.headerLinks(2)).toBeVisible();
    await homePage.headerLinks(2).click();

    await expect(homePage.findVitaminsForMeSubmenu(1)).toBeVisible();
    await homePage.findVitaminsForMeSubmenu(1).click();

    // replaces waits.pause2S()
    await expect(homePage.kidsVitamin).toBeVisible();

    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();

    await expect(productTitleInBybenefits2.trim()).toBe(testdata.headers.whatdoineed);
  });

  test("Verify that 'Ask Our Experts' page is displayed when 'Ask Our Experts' submenu is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
  
    await expect(homePage.headerLinks(2)).toBeVisible();
    await homePage.headerLinks(2).click();
  
    await expect(homePage.findVitaminsForMeSubmenu(4)).toBeVisible();
    await homePage.findVitaminsForMeSubmenu(4).click();
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.kidsVitamin).toBeVisible();
  
    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();
  
    await expect(productTitleInBybenefits2.trim()).toBe(testdata.headers.askourexperts);
  });

  test("Verify that 'Multivitamins' collection page is displayed when 'Find Your Multivitamins' link is clicked in banner image", async ({ page }) => {

    const homePage = new HomePage(page);  
    await expect(homePage.headerLinks(2)).toBeVisible();
    await homePage.headerLinks(2).click();
  
    await expect(homePage.findYourMultivitaminsLink).toBeVisible();
    await homePage.findYourMultivitaminsLink.click();
  
    await expect(homePage.kidsVitamin).toBeVisible();
  
    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();
  
    await expect(productTitleInBybenefits2.trim()).toBe(testdata.headers.multivitamins);
  });

});

test.describe("Tips & Resources", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;
  let faq;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    faq=new faqPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the 'Health Articles' page is displayed when 'Articles' submenu is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page)

    await homeSteps.ratingPopup();

    await expect(homePage.headerLinks(3)).toBeVisible();
    await homePage.headerLinks(3).click();

    await expect(homePage.tipsAndResourcesSubmenu(1)).toBeVisible();
    await homePage.tipsAndResourcesSubmenu(1).click();

    await expect(homePage.kidsVitamin).toBeVisible();

    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();

    await expect(productTitleInBybenefits2.trim()).toBe(testdata.productTitles.healthAricleTitle);

  });

  test("Verify that the 'Studies' page is displayed when 'Research' submenu is clicked", async ({ page }) => {

    const homePage = new HomePage(page);  
    await expect(homePage.headerLinks(3)).toBeVisible();
    await homePage.headerLinks(3).click();
  
    await expect(homePage.tipsAndResourcesSubmenu(2)).toBeVisible();
    await homePage.tipsAndResourcesSubmenu(2).click();
  
    await expect(homePage.kidsVitamin).toBeVisible();
  
    const productTitleInBybenefits2 = await (homePage.kidsVitamin.textContent());
  
    await expect(productTitleInBybenefits2.trim()).toBe(testdata.headers.research);
  });

  test("Verify that the 'Health Articles' page is displayed when 'Explore Health Resources' link is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page)
  
    await expect(homePage.headerLinks(3)).toBeVisible();
    await homePage.headerLinks(3).click();
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.exploreHealthResourcesLink).toBeVisible();
    await homePage.exploreHealthResourcesLink.click();
  
    await expect(homePage.kidsVitamin).toBeVisible();
  
    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();
  
    await expect(productTitleInBybenefits2.trim()).toBe(testdata.productTitles.healthAricleTitle);
  });

  test("Verify that the 'New FAQ' page is displayed when 'FAQ' submenu is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const faq = new faqPage(page);
  
    await expect(homePage.headerLinks(3)).toBeVisible();
    await homePage.headerLinks(3).click();
  
    await expect(homePage.tipsAndResourcesSubmenu(3)).toBeVisible();
    await homePage.tipsAndResourcesSubmenu(3).click();
  
    await expect(faq.faqHeading).toBeVisible();
  
    const faqHeadingText = await faq.faqHeading.textContent();
  
    await expect(faqHeadingText.trim()).toBe(testdata.productsGeneralPgTitles.generalquestion);
  });


});

test.describe("About", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); // FIXED (was homeSteps not homePage)
  });

  test("Verify that the 'About Us' page is displayed when 'About Nature Made' submenu is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps((page))

    await expect(homePage.headerLinks(4)).toBeVisible();
    await homePage.headerLinks(4).click();

    await expect(homePage.aboutusSubmenu(1)).toBeVisible();
    await homePage.aboutusSubmenu(1).click();

    await homeSteps.ratingPopup();

    await expect(homePage.kidsVitamin).toBeVisible();

    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();

    await expect(productTitleInBybenefits2.trim()).toBe(testdata.aboutusdData.about);
  });

  test("Verify that the 'About Nature Made' page is displayed when 'Discover Nature Made' link is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
  
    await expect(homePage.headerLinks(4)).toBeVisible();
    await homePage.headerLinks(4).click();
  
    await expect(homePage.discoverNatureMadeLink).toBeVisible();
    await homePage.discoverNatureMadeLink.click();
  
    // replaces waits.pause2S()
    await expect(homePage.kidsVitamin).toBeVisible();
  
    const productTitleInBybenefits2 = await homePage.kidsVitamin.textContent();
  
    await expect(productTitleInBybenefits2.trim()).toBe(testdata.aboutusdData.about);
  });

});

test.describe("Home page - Find Your Daily Routine", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that the user is navigated to 'Products details' page when 'Best seller' products image is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const blogosteps=new BlogSteps(page)
    const productDetails = new ProductDetailsPage(page);

    await blogosteps.clickCompanyLogo();

    await page.evaluate(() => window.scrollBy(0, 700));

    await homeSteps.ratingPopup();

    await expect(homePage.homeBestSellersProducts).toBeVisible();
    await homePage.homeBestSellersProducts.click();

    await expect(homePage.productImgs(1)).toBeVisible();

    await homePage.productImgs(1).dblclick();

    await expect(productDetails.productName).toBeVisible();

    await homeSteps.ratingPopup();

    const productName = await productDetails.productName.textContent();

    await expect(productName.trim()).toBe(testdata.productTitles.magnesiumGlycinate200mg);

  });

  test("Verify that the user is navigated to 'Products details' page when 'New Products' products image is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page)
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
  
    await page.evaluate(() => window.scrollBy(0, 700));
  
    await expect(homePage.homeNewProducts).toBeVisible();
    await homePage.homeNewProducts.click();
  
    await page.evaluate(() => window.scrollBy(0, 100));
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.newProductImages(3)).toBeVisible();
  
    await homePage.newProductImages(3).dblclick();
  
    await expect(productDetails.productName).toBeVisible();
  
    await homeSteps.ratingPopup();
  
    const productName = await productDetails.productName.textContent();
  
    await expect(productName.trim()) .toBe(testdata.productTitles.creatineMonohydrate);
  });

  test("Verify that the user is navigated to 'Products details' page when 'Best seller' products title is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
  
    await page.evaluate(() => window.scrollBy(0, 700));
  
    await expect(homePage.homeBestSellersProducts).toBeVisible();
    await homePage.homeBestSellersProducts.click();
  
    await expect(homePage.productTitleText(1)).toBeVisible();
  
    await homePage.productTitleText(1).dblclick();
  
    await expect(productDetails.productName).toBeVisible();
  
    const productName = await productDetails.productName.textContent();
  
    await expect(productName.trim())
      .toBe(testdata.productTitles.magnesiumGlycinate200mg);
  });

  test("Verify that the user is navigated to 'Products details' page when 'Best seller' products rating is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
    
    await homeSteps.clickCompanyLogo();
  
    await page.mouse.wheel(0, 700);
  
    await expect(homePage.homeBestSellersProducts).toBeVisible();
    await homePage.homeBestSellersProducts.click();
  
    const rating = homePage.productRatings(1);
    await expect(rating).toBeVisible();
  
    await rating.dblclick();
  
    await productDetails.productName.waitFor({ state: 'visible', timeout: 30000 });
  
    const productNameText = await productDetails.productName.textContent();

    expect(productNameText.trim()).toBe(testdata.productTitles.magnesiumGlycinate200mg);
  
  });

  test("Verify that the user is navigated to 'Products details' page when 'Best seller' products 'Buy now' is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page)
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
    
    await page.mouse.wheel(0, 700);
  
    await expect(homePage.homeBestSellersProducts).toBeVisible();
    await homePage.homeBestSellersProducts.click();
  
    await page.mouse.wheel(0, 150);
  
    const buyNowBtn = homePage.bestSellerBuyNowBtns(1);
    await expect(buyNowBtn).toBeVisible();
  
    await buyNowBtn.click();
  
    await expect(productDetails.productName).toBeVisible({ timeout: 30000 });
  
    await expect(productDetails.productName).toHaveText(testdata.productTitles.magnesiumGlycinate200mg);
  
  });

  test("Verify that the 'New Products' are displayed when user clicks on 'New Products'", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page)
  
    await homeSteps.clickCompanyLogo();
    
    await page.mouse.wheel(0, 700);
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.homeNewProducts).toBeVisible();
    await homePage.homeNewProducts.click();
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.newProductImages(2)).toBeVisible();
  
    await expect(homePage.newProductTitleTxt(2)).toBeVisible();
    await expect(homePage.newProductTitleTxt(3)).toBeVisible();
  
  });

  test("Verify that the user is navigated to 'Products details' page when 'New Products' products title is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
  
    await homePage.homeNewProducts.scrollIntoViewIfNeeded();
  
    await expect(homePage.homeNewProducts).toBeVisible();
    await homePage.homeNewProducts.click();
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.newProductTitleTxt(3)).toBeVisible();
  
    await homePage.newProductTitleTxt(3).dblclick();
  
    await expect(productDetails.productName).toBeVisible();
  
    await homeSteps.ratingPopup();
  
    await expect(productDetails.productName).toHaveText(testdata.productTitles.creatineMonohydrate);
  });

  test("Verify that the user is navigated to 'Products details' page when 'New Products' products rating is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
  
    // Scroll to section (Playwright way)
    await homePage.homeNewProducts.scrollIntoViewIfNeeded();
  
    await expect(homePage.homeNewProducts).toBeVisible();
    await homePage.homeNewProducts.click();
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.newProductRatings(3)).toBeVisible();
  
    await homePage.newProductRatings(3).dblclick();
  
    await expect(productDetails.productName).toBeVisible();
  
    await homeSteps.ratingPopup();
  
    await expect(productDetails.productName).toHaveText(testdata.productTitles.creatineMonohydrate);
  });

  test("Verify that the user is navigated to 'Products details' page when 'Buy Now' on 'New Products' list is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
  
    await homePage.homeNewProducts.scrollIntoViewIfNeeded();
  
    await expect(homePage.homeNewProducts).toBeVisible();
    await homePage.homeNewProducts.click();
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.newProductBuyNowBtns(3)).toBeVisible();
  
    await homePage.newProductBuyNowBtns(3).dblclick();
  
    await homeSteps.ratingPopup();
  
    await expect(productDetails.productName).toBeVisible();
  
    await expect(productDetails.productName).toHaveText(testdata.productTitles.creatineMonohydrate);
  });



});

test.describe("Here For You Every Day", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that the 'About Nature Made' page is displayed when the user clicks on the 'Learn About Us' button", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);

    await homeSteps.clickCompanyLogo();

    await homePage.learnAboutUsBtn.scrollIntoViewIfNeeded();

    await expect(homePage.learnAboutUsBtn).toBeVisible();
    await homePage.learnAboutUsBtn.click();

    await expect(homePage.kidsVitamin).toBeVisible();

    const text = await homePage.kidsVitamin.textContent();

    await expect(text.trim()).toBe(testdata.aboutusdData.about);

  });

  test("Verify that the user is redirected to the appropriate page when the following links are clicked in the `Here for You Everyday` section - Our Experts, Our Brands, Our History", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
  
    await homeSteps.clickCompanyLogo();
  
    await homePage.aboutusBtn(1).scrollIntoViewIfNeeded();
    await expect(homePage.aboutusBtn(1)).toBeVisible();
  
    await homePage.aboutusBtn(1).click();
  
    await expect(homePage.kidsVitamin).toHaveText(testdata.aboutusdData.experts);
  
    // -------- Our Brands --------
    await homeSteps.clickCompanyLogo();
  
    await homePage.aboutusBtn(2).scrollIntoViewIfNeeded();
    await homeSteps.ratingPopup();
  
    await expect(homePage.aboutusBtn(2)).toBeVisible();
    await homePage.aboutusBtn(2).click();
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.kidsVitamin).toHaveText(testdata.aboutusdData.brands);
  
    // -------- Our History --------
    await homeSteps.clickCompanyLogo();
  
    await homePage.aboutusBtn(3).scrollIntoViewIfNeeded();
    await homeSteps.ratingPopup();
  
    await expect(homePage.aboutusBtn(3)).toBeVisible();
    await homePage.aboutusBtn(3).click();
  
    await homeSteps.ratingPopup();
  
    await expect(homePage.kidsVitamin).toHaveText(testdata.aboutusdData.history);
  
  });

});

test.describe("Product list page", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new productListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that the filter dialog is displayed when user clicks on Filter option in Product list page", async ({ page }) => {

    const homeSteps=new HomePageSteps(page);
    const productListPages = new productListPage(page);

    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);

    await productListPages.filterIcon.scrollIntoViewIfNeeded();

    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();

    await expect(productListPage.filterClearAllLink).toBeVisible();

    await expect(productListPage.filterClearAllLink).toHaveText(testdata.filterBtn.clearAllTxt);

  });

  test("Verify that the appropriate products are displayed when filters are applied", async ({ page }) => {

    const productListPage = new ProductListPage(page);
  
    await expect(productListPage.productsFilterCheckboxHeading(3)).toBeVisible();
    await productListPage.productsFilterCheckboxHeading(3).click();
  
    await expect(productListPage.gummyCheckbox(3)).toBeVisible();
    await productListPage.gummyCheckbox(3).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await productListPage.prodTitlesForFilter1.scrollIntoViewIfNeeded();
  
    await expect(productListPage.prodTitlesForFilter1).toBeVisible();
  
    const productTitle = await productListPage.prodTitlesForFilter1.textContent();
  
    await expect(productListPage.filterCount).toBeVisible();
  
    await expect(productTitle.trim()).toBe("Hair-Skin-Nails‡");
  });

  test("Verify that the applied filters are cleared when user taps on 'Clear Filter' option in Product list page", async ({ page }) => {

    const productListPage = new ProductListPage(page);
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.clearAllInFilter).toBeVisible();
    await productListPage.clearAllInFilter.click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.filterCount).not.toBeVisible();
  
  });

  test("Verify that the user is able to search the products by 'Price filter' in Product list page", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
  
    await productListPage.filterIcon.scrollIntoViewIfNeeded();
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.productFilterCheckboxHeading(2)).toBeVisible();
    await productListPage.productFilterCheckboxHeading(2).click();
  
    await expect(productListPage.priceFilters(2)).toBeVisible();
    await productListPage.priceFilters(2).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.productPriceForFilter(1)).toBeVisible();
    await expect(productListPage.productPriceForFilter(2)).toBeVisible();
    const price1 = await productListPage.productPriceForFilter(1).textContent();
    const price2 = await productListPage.productPriceForFilter(2).textContent();
  
    const p1 = parseFloat(price1.replace(/[^0-9.]/g, ''));
    const p2 = parseFloat(price2.replace(/[^0-9.]/g, ''));
    expect(p1).toBeLessThan(25);
    expect(p2).toBeLessThan(25);
  
  });

  test("Verify that appropriate products are displayed when the user selects the 'Title A-Z' sort by option in Product List page", async ({ page }) => {

    const productListPage = new ProductListPage(page);
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.clearAllInFilter).toBeVisible();
    await productListPage.clearAllInFilter.click();
  
    await expect(productListPage.filterSort(2)).toBeVisible();
    await productListPage.filterSort(2).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.productTitlesForFilter(1)).toBeVisible();
  
    const title = await productListPage.productTitlesForFilter(1).textContent();
  
    await expect(title.trim()).toBe("Hair-Skin-Nails‡");
  });

  test("Verify that appropriate products are displayed when the user selects the 'Title Z-A' sort by option in Product List page", async ({ page }) => {

    const productListPage = new ProductListPage(page);
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.clearAllInFilter).toBeVisible();
    await productListPage.clearAllInFilter.click();
  
    await expect(productListPage.filterSort(3)).toBeVisible();
    await productListPage.filterSort(3).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.productTitlesForFilter(1)).toBeVisible();
  
    const title = await productListPage.productTitlesForFilter(1).textContent();
  
    await expect(title.trim()).toBe("Hair-Skin-Nails‡");
  });

  test("Verify that the user is able to sort the products by 'Price (asc)' filter in Product list page", async ({ page }) => {

    const productListPage = new ProductListPage(page);
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.clearAllInFilter).toBeVisible();
    await productListPage.clearAllInFilter.click();
  
    await expect(productListPage.filterSort(4)).toBeVisible();
    await productListPage.filterSort(4).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.productTitlesForFilter(1)).toBeVisible();
  
    const title = await productListPage.productTitlesForFilter(1).textContent();
  
    await expect(title.trim()).toBe("Hair-Skin-Nails‡");
  });

  test("Verify that the user is able to sort the product by 'Price (desc)' filter in Product list page", async ({ page }) => {

    const productListPage = new ProductListPage(page);
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.clearAllInFilter).toBeVisible();
    await productListPage.clearAllInFilter.click();
  
    await expect(productListPage.filterSort(5)).toBeVisible();
    await productListPage.filterSort(5).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.productTitlesForFilter(1)).toBeVisible();
  
    const title = await productListPage.productTitlesForFilter(1).textContent();
  
    await expect(title.trim()).toBe("Hair-Skin-Nails‡");
  });

  test("Verify that the user is navigated to 'Products details' page when product image is clicked in the Product list page", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
  
    await productListPage.plpViewMoreLink.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup(); 
  
    await expect(productListPage.plpViewMoreLink).toBeVisible();
    await productListPage.plpViewMoreLink.click();
  
    await expect(productListPage.productTitlesForFilter(4)).toBeVisible();
  
    const pricePLP = await productListPage.plpProductTypePrice(4).textContent();
  
    await productListPage.productTitlesForFilter(4).click();
  
    await expect(productDetails.productPrice1).toBeVisible();
  
    const pricePDP = await productDetails.productPrice1.textContent();
  
    expect(pricePLP.trim()).toBe(pricePDP.trim());
  });

  test("Verify that the user is navigated to 'Products details' page when product title is clicked in Product list page", async ({ page }) => {

    const homeSteps=new HomePageSteps(page)
    const productListPage = new ProductListPage(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
    
    await productListPage.plpViewMoreLink.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.plpViewMoreLink).toBeVisible();
    await productListPage.plpViewMoreLink.click();
  
    await expect(productListPage.productTitlesForFilter(3)).toBeVisible();
  
    const pricePLP = await productListPage.plpProductTypePrice(3).textContent();
  
    await productListPage.productTitlesForFilter(3).click();
  
    await expect(productDetails.productPrice1).toBeVisible();
  
    const pricePDP = await productDetails.productPrice1.textContent();
  
    expect(pricePLP.trim()).toBe(pricePDP.trim());
  });

  test("Verify that the user is navigated to 'Products details' page when product rating is clicked in Product list page", async ({ page }) => {

    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
  
    await productListPage.plpViewMoreLink.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.plpViewMoreLink).toBeVisible();
    await productListPage.plpViewMoreLink.click();
  
    await expect(productListPage.plpProductRating(4)).toBeVisible();
  
    await homeSteps.ratingPopup();
  
    const pricePLP = await productListPage.plpProductTypePrice(4).textContent();
  
    await productListPage.plpProductRating(4).click();
  
    await expect(productDetails.productPrice1).toBeVisible();
  
    const pricePDP = await productDetails.productPrice1.textContent();
  
    expect(pricePLP.trim()).toBe(pricePDP.trim());
  });

  test("Verify that the user is navigated to 'Products details' page when 'Buy Now' is clicked in Product list page", async ({ page }) => {

    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
  
    await productListPage.plpViewMoreLink.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.plpViewMoreLink).toBeVisible();
    await productListPage.plpViewMoreLink.click();
  
    await expect(productListPage.plpProductBuynow(4)).toBeVisible();
  
    const pricePLP = await productListPage.plpProductTypePrice(4).textContent();
  
    await productListPage.plpProductBuynow(4).click();
  
    await expect(productDetails.productPrice1).toBeVisible();
  
    const pricePDP = await productDetails.productPrice1.textContent();
  
    expect(pricePLP.trim()).toBe(pricePDP.trim());
  });

  test("Verify that the next 12 products are displayed when 'Show more' button is clicked in Product list page", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
  
    await productListPage.plpViewMoreLink.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.plpViewMoreLink).toBeVisible();
    await productListPage.plpViewMoreLink.click();
  
    await expect(productListPage.productCard(5)).toBeVisible();
    await expect(productListPage.productCard(6)).toBeVisible();
    await expect(productListPage.productCard(7)).toBeVisible();
    await expect(productListPage.productCard(8)).toBeVisible();
  
  });

  test("Verify that user is redirected correctly when 'Shop' and 'Explore' jumplinks are clicked", async ({ page }) => {

    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 2, testdata.headers.bvitamins);
  
    await productListPage.collectionJumpLink(1).scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    // Click 'Shop' jumplink
    await expect(productListPage.collectionJumpLink(1)).toBeVisible();
    await productListPage.collectionJumpLink(1).click();
  
    await expect(productListPage.collectionSubTitle).toBeVisible();
    const shopText = await productListPage.collectionSubTitle.textContent();
    expect(shopText.trim()).toBe(testdata.healthNeedsdata.b12);
  
    // Scroll back up
    await page.evaluate(() => window.scrollBy(0, -500));
  
    // Click 'Explore' jumplink
    await expect(productListPage.collectionJumpLink(2)).toBeVisible();
    await productListPage.collectionJumpLink(2).click();
  
    await expect(productListPage.relatedArticleHeading).toBeVisible();
    const exploreText = await productListPage.relatedArticleHeading.textContent();
    expect(exploreText.trim()).toBe(testdata.heading.bVitaminsResources);
  });

  test("Verify that the `Best Sellers` tag products are displayed when the `Best Sellers` checkbox is selected within the filter dialog", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(1, 2, testdata.headers.adultgummies);
  
    await productListPage.filterIcon.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.productFilterOptions(1)).toBeVisible();
    await productListPage.productFilterOptions(1).click();
  
    await expect(productListPage.productFilterFeatureCheckboxes(1)).toBeVisible();
    await productListPage.productFilterFeatureCheckboxes(1).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.productBestSellerBadge).toBeVisible();
  
    const badgeText = await productListPage.productBestSellerBadge.textContent();
    expect(badgeText.trim()).toBe(testdata.headers.bestSellerBadgeTxt);
  });

  test("Verify that 'New' tag products are displayed when 'New' filter is applied", async ({ page }) => {

    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(1, 2, testdata.headers.adultgummies);
  
    await productListPage.filterIcon.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.productFilterOptions(1)).toBeVisible();
    await productListPage.productFilterOptions(1).click();
  
    await expect(productListPage.productFilterFeatureCheckboxes(2)).toBeVisible();
    await productListPage.productFilterFeatureCheckboxes(2).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.productNewBadge).toBeVisible();
  
    const badgeText = await productListPage.productNewBadge.textContent();
    expect(badgeText.trim()).toBe(testdata.headers.newBadgeTxt);
  });

  test("Verify that the product count '0-30` are filtered when the user clicks the `0-30` count checkbox in the `Count` dropdown", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(1, 2, testdata.headers.adultgummies);
  
    // Scroll to filter
    await productListPage.filterIcon.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.productFilterOptions(5)).toBeVisible();
    await productListPage.productFilterOptions(5).click();
  
    await expect(productListPage.countFilterOption(1)).toBeVisible();
    await productListPage.countFilterOption(1).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.shopifyProductImg(2)).toBeVisible();
  
    const countText = await productListPage.shopifyProductImg(2).textContent();
  
    const countValue = parseInt(countText.replace(/\D/g, ''), 10);
  
    expect(countValue).toBeLessThanOrEqual(30);
  });

  test("Verify that the product price '50-75` are filtered when the user clicks the `50-75` count checkbox in the `Price Range` dropdown", async ({ page }) => {

    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(1, 2, testdata.headers.adultgummies);
  
    await productListPage.filterIcon.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.productFilterOptions(5)).toBeVisible();
    await productListPage.productFilterOptions(5).click();
  
    await expect(productListPage.countFilterOption(3)).toBeVisible();
    await productListPage.countFilterOption(3).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.shopifyProductImg(2)).toBeVisible();
  
    const priceText = await productListPage.shopifyProductImg(2).textContent();
  
    const priceValue = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  
    expect(priceValue).toBeGreaterThanOrEqual(50);
    expect(priceValue).toBeLessThanOrEqual(75);
  });

  test("Verify that the `Softgel` products are filtered when the user clicks the  `Softgel` checkbox in the `Pill Type` dropdown", async ({ page }) => {

    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
    const productDetails = new ProductDetailsPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
  
    await productListPage.filterIcon.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
  
    await expect(productListPage.productsFilterCheckboxHeading(3)).toBeVisible();
    await productListPage.productsFilterCheckboxHeading(3).click();
  
    await expect(productListPage.filterProductType(4)).toBeVisible();
    await productListPage.filterProductType(4).click();
  
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
    await expect(productListPage.plpProductRating(1)).toBeVisible();
    await productListPage.plpProductRating(1).click();
  
    await expect(productDetails.pdpProductType).toBeVisible();
  
    const productType = await productDetails.pdpProductType.textContent();
    expect(productType.trim()).toBe(testdata.productDetailsPage.Softgel);
  });

  test("Verify that user is redirected to 'Health Articles' page when 'Explore All Articles' is clicked", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
  
    await productListPage.relatedResourceLink.scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.relatedResourceLink).toBeVisible();
    await productListPage.relatedResourceLink.click();
  
    await expect(homePage.kidsVitamin).toHaveText(testdata.productTitles.healthAricleTitle);
  });

  test("Verify that 'Collection' and 'Other People Are Buying' tabs are displayed in Explore More section", async ({ page }) => {

    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.productListInSubmenuAtoZ(2, 5, testdata.headers.biotin);
  
    // Scroll to Explore More section
    await productListPage.exploreMoreTab(1).scrollIntoViewIfNeeded();
  
    await homeSteps.ratingPopup();
  
    await expect(productListPage.exploreMoreTab(1)).toHaveText(testdata.heading.collection);
  
    await expect(productListPage.exploreMoreTab(2)).toHaveText(testdata.heading.otherpeoplebuying);
  });



});

test.describe('Product list page -1', () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page);
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test('Verify that the user is redirected to the Product list page when clicking any option in Product header menu', async ({ page }) => {
    const blogoSteps=new BlogSteps(page)
    const homePage = new HomePageSteps(page);

    await blogoSteps.clickCompanyLogo();
    await homePage.productListInSubmenuAtoZ(12, 3,testdata.headers.melatonin);
  })

  test('Verify that the Sort By dropdown is open by default in the filter dialog', async ({ page }) => {

    const productListPage = new ProductListPage(page);
    await expect(productListPage.filterIcon).toBeVisible();
    await productListPage.filterIcon.click();
    await expect(productListPage.sortByFilter).toBeVisible();
    const sortby = (await productListPage.sortByFilter.textContent()).replace(/\s+/g, '');
    console.log(sortby);
    expect(sortby).toContain('SortBy:Featured');
  });

  test('Verify that the following options are displayed in the Pill Type dropdown - Caplet, Softgel, Tablet', async ({ page }) => {

    const productListPage = new ProductListPage(page);
    await expect(productListPage.sortByFilter).toBeVisible();
    const pillTypeFilter = productListPage.brainCheckbox(3);
    await expect(pillTypeFilter).toBeVisible();
    await pillTypeFilter.click();
    const gummyOption = productListPage.melatoninProductType(1);
    await expect(gummyOption).toBeVisible();
    const gummyText = (await productListPage.melatoninProductTypeText(1).textContent()).trim();
    expect(gummyText).toBe(testdata.heading.gummy);
    const tabletOption = productListPage.melatoninProductType(3);
    await expect(tabletOption).toBeVisible();
    const tabletText = (await productListPage.melatoninProductTypeText(3).textContent()).trim();
    expect(tabletText).toBe(testdata.heading.tablet);
  
  });

  test('Verify that the following options are displayed in the Count dropdown - 45, 60, 60, 90, 90+', async ({ page }) => {

    const productListPage = new ProductListPage(page);
    await expect(productListPage.sortByFilter).toBeVisible();
    const filter2 = productListPage.brainCheckbox(2);
    await expect(filter2).toBeVisible();
    await filter2.click();
    const filter5 = productListPage.brainCheckbox(5);
    await expect(filter5).toBeVisible();
    await filter5.click();
    const firstCount = productListPage.brainCountCheckbox(2);
    await expect(firstCount).toBeVisible();
    await expect(firstCount).toHaveText(testdata.heading.secondcount);

    const secondCount = productListPage.brainCountCheckbox(3);
    await expect(secondCount).toBeVisible();
    await expect(secondCount).toHaveText(testdata.heading.thirdcount);
  
    const thirdCount = productListPage.brainCountCheckbox(4);
    await expect(thirdCount).toBeVisible();
    await expect(thirdCount).toHaveText(testdata.heading.fourthcount);
  
    const fourthCount = productListPage.brainCountCheckbox(5);
    await expect(fourthCount).toBeVisible();
    await expect(fourthCount).toHaveText(testdata.heading.fifthcount);
  
    await filter5.click();
    await expect(productListPage.applyFilterBtn).toBeVisible();
    await productListPage.applyFilterBtn.click();
  
  });

  test('Verify that less than 3 article images are not displayed in the resource article section', async ({ page }) => {

    const productListPage = new ProductListPage(page);
    await page.mouse.wheel(0, 2300);
    await expect(productListPage.relatedArticleHeading).toBeVisible();
    const article1 = productListPage.articleTitle(1);
    await expect(article1).toBeVisible();
    await expect(article1).toHaveText(testdata.healtharticles.plparticle1);
  
    const article2 = productListPage.articleTitle(2);
    await expect(article2).toBeVisible();
    await expect(article2).toHaveText(testdata.healtharticles.plparticle2);
  
    const article3 = productListPage.articleTitle(3);
    await expect(article3).toBeVisible();
    await expect(article3).toHaveText(testdata.healtharticles.plparticle3);
  
  });

  test('Verify that the footer section is displayed below the Explore More section on the product list page', async ({ page }) => {

    const homePage = new HomePageSteps(page);
    const productListPage = new ProductListPage(page);
    const blogoSteps=new BlogSteps(page)
  
    await blogoSteps.clickCompanyLogo();
    await homePage.productListInSubmenuAtoZ(12, 3, testdata.headers.melatonin);
  
    await page.mouse.wheel(0, 3900);
  
    // Validate Explore More heading
    await expect(productListPage.exploreMoreHeading).toBeVisible();
    await expect(productListPage.exploreMoreHeading)
      .toHaveText(testdata.headers.exploremore);
  
    // Validate "Collection" tab
    const collectionTab = productListPage.exploreMoreTab(1);
    await expect(collectionTab).toBeVisible();
    await expect(collectionTab)
      .toHaveText(testdata.heading.collection);
  
    // Validate "Other People Buying" tab
    const otherTab = productListPage.exploreMoreTab(2);
    await expect(otherTab).toBeVisible();
    await expect(otherTab).toHaveText(testdata.heading.otherpeoplebuying);
  

  })
})

test.describe('Product Details Page', () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let productSteps;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page); 
    productSteps=new productDetailSteps(page)   
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that the quantity of the Products is increased when the user clicks on '+' icon in Product details page", async ({ page }) => {
    const blogoSteps=new BlogSteps(page)
    const homeSteps = new HomePageSteps(page);
    const homePage=new HomePage(page)
    const productDetails = new ProductDetailsPage(page);
    const cart = new cartPage(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.productsearch("Biotin");
    await homeSteps.ratingPopup();
    const product = productDetails.searchPageProdTitle(2);
    await expect(product).toBeVisible();
    await product.click();
    await expect(productDetails.productPrice1).toBeVisible();
    const priceA = await productDetails.productPrice1.textContent();
    await expect(productDetails.addToCart).toBeVisible();
    await productDetails.addToCart.click();
    await expect(homePage.cartView).toBeVisible();
    await homePage.cartView.click();
    await expect(productDetails.cartQuantity).toBeVisible();
    const cartPriceLocator = cart.cartProductPrice(1);
    await expect(cartPriceLocator).toBeVisible();
    const priceB = await cartPriceLocator.textContent();
    const a = parseFloat(priceA.replace(/[^0-9.]/g, ''));
    const b = parseFloat(priceB.replace(/[^0-9.]/g, ''));
    expect(b).toBeGreaterThan(a);

  })

  test("Verify that the quantity of the Products is decreased when user clicks '-' icon in product details page", async ({ page }) => {

  const blogoSteps = new BlogSteps(page);
  const home=new HomePage(page)
  const homePage = new HomePageSteps(page);
  const productDetails = new ProductDetailsPage(page);
  const cart = new CartPageSteps(page);
  const cartDetails=new cartPage(page)

  await blogoSteps.clickCompanyLogo();
  await homePage.removeAllProductsFromCart();
  await homePage.clickCompanyLogo();
  await homePage.productsearch("Biotin");
  await homePage.ratingPopup();
  const product = productDetails.searchPageProductTitle(2);
  await expect(product).toBeVisible();
  await product.click();

  const decreaseBtn = productDetails.quantityChangeBtn(3);
  await expect(decreaseBtn).toBeVisible();
  await decreaseBtn.click();
  await expect(productDetails.addToCart).toBeVisible();
  await productDetails.addToCart.click();
  await expect(home.cartView).toBeVisible();
  await home.cartView.click();

  const priceLocator = cartDetails.cartProductPrice(1);
  await expect(priceLocator).toBeVisible();
  const priceA = await priceLocator.textContent();

  const decreaseCartBtn = cartDetails.cartIncreaseorDecrease(1);
  await expect(decreaseCartBtn).toBeVisible();
  await decreaseCartBtn.click();
  await expect(priceLocator).toBeVisible();
  const priceB = await priceLocator.textContent();

  const a = parseFloat(priceA.replace(/[^0-9.]/g, ''));
  const b = parseFloat(priceB.replace(/[^0-9.]/g, ''));
  expect(b).toBeLessThan(a);

  });

  test("Verify that the user is navigated to 'Reviews' section when 'Ratings' on the product is clicked in 'Product details page", async ({ page }) => {

  const blogoSteps = new BlogSteps(page);
  const home=new HomePage(page)
  const homePage = new HomePageSteps(page);
  const productDetails = new ProductDetailsPage(page);
  const cart = new CartPageSteps(page);
  const cartDetails=new cartPage(page)
  
  await blogoSteps.clickCompanyLogo();
  await homePage.removeAllProductsFromCart();
  await homePage.clickCompanyLogo();
  await homePage.productsearch("Biotin");
  await homePage.ratingPopup();
  const product = productDetails.searchPageProductTitle(2);
  await expect(product).toBeVisible();
  await product.click();
  await (productDetails.ratingCount).waitFor({ state: 'visible' });
  await (productDetails.ratingCount).click();  
  const reviewText = await (productDetails.productReviewSection).textContent();
  await expect(reviewText).toBe(testdata.productDetailsPage.productreviews);
  });

  test("Verify that the Products is successfully added to the cart when 'Add to cart' option is clicked", async ({ page }) => {

  const blogoSteps = new BlogSteps(page);
  const home=new HomePage(page)
  const homePage = new HomePageSteps(page);
  const productDetails = new ProductDetailsPage(page);
  const cart = new CartPageSteps(page);
  const cartDetails=new cartPage(page)
  const productSteps=new productDetailSteps(page)
  
  await blogoSteps.clickCompanyLogo();
  await homePage.removeAllProductsFromCart();
  await homePage.clickCompanyLogo();
  await homePage.productsearch("Biotin");
  await homePage.ratingPopup();
  const product = productDetails.searchPageProductTitle(2);
  await expect(product).toBeVisible();
  await product.click();   
  await (productDetails.productName).waitFor({ state: 'visible' });
  const productName = await (productDetails.productName).textContent();
  await (productDetails.addToCart).waitFor({ state: 'visible' });
  await (productDetails.addToCart).click();  
  await (home.cartView).waitFor({ state: 'visible' });
  await (home.cartView).click();
  await (cartDetails.cartProductTitle(1)).waitFor({ state: 'visible' });
  const cartProductName = await (cartDetails.cartProductTitle(1)).textContent();
  await expect(cartProductName).toBe(productName);

  });

  test("Verify that the product price changes when the user change the bottle count on the product details page", async ({ page }) => {

    const blogoSteps = new BlogSteps(page);
    const home=new HomePage(page)
    const homePage = new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
    const cart = new CartPageSteps(page);
    const cartDetails=new cartPage(page)
    const productSteps=new productDetailSteps(page)
    
    await blogoSteps.clickCompanyLogo();
    await homePage.removeAllProductsFromCart();
    await homePage.clickCompanyLogo();
    await homePage.productsearch("Biotin");
    await homePage.ratingPopup();
    const product = productDetails.searchPageProductTitle(2);
    await expect(product).toBeVisible();
    await product.click();   
    await (productDetails.productName).waitFor({ state: 'visible' });  
    await (productDetails.productsCount(3)).waitFor({ state: 'visible' });
    await (productDetails.productsCount(3)).click();
    const price1 = await (productDetails.productPrice1).textContent() 
    await (productDetails.productsCount(5)).waitFor({ state: 'visible' });
    await (productDetails.productsCount(5)).click();
    const price2 = await (productDetails.productPrice1).textContent(); 
    const p1 = parseFloat(price1.replace(/[^0-9.]/g, ''));
    const p2 = parseFloat(price2.replace(/[^0-9.]/g, ''));
    await expect(p2).toBeGreaterThan(p1);    
    await expect(p1).not.toBe(p2); 

  });

  test("Verify that the correct count is reflected in the cart when user change the bottle count on the product details page and adds it to the cart", async ({ page }) => {
    const blogoSteps = new BlogSteps(page);
    const home=new HomePage(page)
    const homePage = new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
    const cart = new CartPageSteps(page);
    const cartDetails=new cartPage(page)
    const productSteps=new productDetailSteps(page)

    await (productDetails.productsCount(5)).waitFor({ state: 'visible' });
    const selectedCount = await (productDetails.productsCount(5)).textContent();
    await (productDetails.addToCart).waitFor({ state: 'visible' });
    await (productDetails.addToCart).click();
    await (home.cartView).waitFor({ state: 'visible' });
    await (home.cartView).click();
    await (cartDetails.cartHeading).waitFor({ state: 'visible' });
    await (cartDetails.productCountInCart(1)).waitFor({ state: 'visible' });
    const cartCount = await (cartDetails.productCountInCart(1)).textContent();
    await expect(cartCount?.trim()).toBe(selectedCount?.trim());
  });

  test("Verify that the `Make wellness your new routine` collection page is displayed when the `Learn More` link in the `Subscribe` radio option is clicked", async ({ page }) => {
    const blogoSteps = new BlogSteps(page);
    const home=new HomePage(page)
    const homePage = new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
    
    await blogoSteps.clickCompanyLogo();
    await homePage.removeAllProductsFromCart();
    await homePage.clickCompanyLogo(); 
    await homePage.productListInSubmenuAtoZ(2, 2, testdata.headers.bvitamins);
    await homePage.ratingPopup()
    await (productDetails.plpProductTitle(4)).waitFor({ state: 'visible' });
    await (productDetails.plpProductTitle(4)).click();
    await (productDetails.subscribesavetenpercentradioPurchase).waitFor({ state: 'visible' });
    await (productDetails.subscribesavetenpercentradioPurchase).click();
    await (productDetails.subscribeSaveLearnMore).waitFor({ state: 'visible' });
    await (productDetails.subscribeSaveLearnMore).click();
    await (home.kidsVitamin).waitFor({ state: 'visible' });
    const header = await (home.kidsVitamin).textContent();
    await expect(header?.trim()).toBe(testdata.heading.marketingSubsPgHeading);

  });

});

test.describe("Product Details Page -1", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let productSteps;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page); 
    const productSteps=new productDetailSteps(page)
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that the user is redirected to the appropriate product details page when a specific product is clicked on any product list page", async ({ page }) => {  
    const blogoSteps=new BlogSteps(page)
    const homeSteps = new HomePageSteps(page);
    const homePage=new HomePage(page)
    const productDetails = new ProductDetailsPage(page);
    const cart = new cartPage(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.productsearch("Biotin");
    await homeSteps.ratingPopup();
    const product = productDetails.searchPageProdTitle(3);
    await expect(product).toBeVisible();
    await product.click();
    await (productDetails.productName).waitFor({ state: 'visible' });
    const prodName = await (productDetails.productName).textContent();
    await expect(productDetails.productPrice1).toBeVisible();
    await expect(prodName?.trim()).toBe(testdata.productNames.biotin1000mcgsoftgels);
  });

  test("Verify that `One Time Delivery` option is selected by default on the Product details page", async ({ page }) => {
    const blogoSteps=new BlogSteps(page)
    const homeSteps = new HomePageSteps(page);
    const homePage=new HomePage(page)
    const productDetails = new ProductDetailsPage(page);
    const cart = new cartPage(page);

    await (productDetails.productName).waitFor({ state: 'visible' });
    await homeSteps.ratingPopup()
    await (productDetails.onetimeradiopurchase).waitFor({ state: 'visible' });
    const oneTimePurchaseText = await (productDetails.onetimeradiopurchase).textContent();
    await expect(oneTimePurchaseText?.trim()).toBe(testdata.productDetailsPage.onetimepurchase);
    await expect(productDetails.onetimeradiopurchase).toBeChecked();
  });

});

test.describe("FAQ Page", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let productSteps;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page); 
    const productSteps=new productDetailSteps(page)
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that the 'Questions?' section is displayed when the user scrolls down to the `FAQ` section", async ({ page }) => {
    const blogoSteps=new BlogSteps(page)
    const homeSteps = new HomePageSteps(page);
    const homePage=new HomePage(page)
    const productDetails = new ProductDetailsPage(page);
    const faq=new faqPage(page)
    const cart = new cartPage(page);

    await (homePage.headerLinks(3)).waitFor({ state: 'visible' });
    await (homePage.headerLinks(3)).click();
    await (homePage.tipsAndResourcesSubmenu(3)).waitFor({ state: 'visible' });
    await (homePage.tipsAndResourcesSubmenu(3)).click();
    await (faq.faqSearchTextField).waitFor({ state: 'visible' });
    await (faq.faqSearchTextField).click();
    await (faq.faqSearchTextField).fill(testdata.productTitles.multivitaminForHer);
    await (faq.faqSearchedProduct).waitFor({ state: 'visible' });
    const prodName = await (faq.faqSearchedProduct).textContent();
    await expect(prodName?.trim()).toBe(testdata.productTitles.multivitaminForHer);
  });

  test("Verify that the appropriate answer is displayed for the 1st question when the user clicks on 'Down arrow' in the Question section", async ({ page }) => {
    const blogoSteps=new BlogSteps(page)
    const homeSteps = new HomePageSteps(page);
    const homePage=new HomePage(page)
    const productDetails = new ProductDetailsPage(page);
    const faq=new faqPage(page)
    const cart = new cartPage(page);
    
    await (homePage.cmpnyLogo).click();
    await (homePage.headerLinks(3)).waitFor({ state: 'visible' });
    await (homePage.headerLinks(3)).click();
    await (homePage.tipsAndResourcesSubmenu(3)).waitFor({ state: 'visible' });
    await (homePage.tipsAndResourcesSubmenu(3)).click();
    await (faq.faqDropdownIcon).waitFor({ state: 'visible' });
    await (faq.faqDropdownIcon).click();
    await (faq.questionDropdownIcon).waitFor({ state: 'visible' });
    await (faq.questionDropdownIcon).click();
    await (faq.questionAns).waitFor({ state: 'visible' });
    const answerText = await (faq.questionAns).textContent();
    await expect(answerText?.trim()).toBe(testdata.faq.prodQuestionAns);
  });

});

test.describe("PDP 2", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let productSteps;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page); 
    const productSteps=new productDetailSteps(page)
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });
  test("Verify that the radio button is moved to 'subscribe' option when user selects 'Subscribe' option in Product details page", async ({ page }) => {
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
    const blog = new blogPage(page);
    const blogsSteps=new BlogSteps(page)

    await blogsSteps.clickCompanyLogo();
    await homeSteps.productsearch("Biotin");
    await homeSteps.ratingPopup();
    await page.evaluate(() => window.scrollBy(0, 300));
    await expect(productDetails.searchPageProdTitle(3)).toBeVisible();
    await productDetails.searchPageProdTitle(3).click();
    await homeSteps.ratingPopup();
    await page.evaluate(() => window.scrollBy(0, 700));
    await expect(productDetails.productPrice1).toBeVisible();
    const oneTime = (await productDetails.productPrice1.textContent())?.trim();
    await expect(oneTime).toBe(testdata.productDetailsPage.bottlecountprice3);
    await productDetails.subscribesavetenpercentradioPurchase.click();
    await expect(productDetails.subscribedPrice1).toBeVisible();
    const subscribePrice = (await productDetails.subscribedPrice1.textContent())?.trim();
    await expect(subscribePrice).toBe(testdata.productDetailsPage.subscribedPrice);
    expect(Number(oneTime.replace('$', ''))).toBeLessThan(Number(subscribePrice.replace('$', '')));
    expect(oneTime).not.toBe(subscribePrice);
  });

  test("Verify that the user is navigated to the product details when the 'Product image' is clicked in the 'Compare with similar products' section on the product details page", async ({ page }) => {
    const blogoSteps=new BlogSteps(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.productPDP();
    await page.evaluate(() => window.scrollBy(0, 4600));
    await homeSteps.ratingPopup();
    await expect(productDetails.compareProductImages).toBeVisible({ timeout: 15000 });
    const compareProductTitle = (await productDetails.compareProductsTitles.textContent())?.trim();
    await productDetails.compareProductImages.click();
    await homeSteps.ratingPopup();
    await expect(productDetails.productName).toBeVisible({ timeout: 15000 });
    const productTitle = (await productDetails.productName.textContent())?.trim();
    expect(productTitle).toBe(compareProductTitle);
  
  });

  test("Verify that the user is navigated to the product details when the 'Product title' is clicked in the 'Compare with similar products' section on the product details page", async ({ page }) => {
    const blog = new blogPage(page);
    const blogoSteps=new BlogSteps(page);
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);
  
    await blogoSteps.clickCompanyLogo();
    await homeSteps.productPDP();
    await page.evaluate(() => window.scrollBy(0, 4600));  
    await homeSteps.ratingPopup();
    await expect(productDetails.compareProductsTitles).toBeVisible({ timeout: 15000 });
    const compareProductTitle = (await productDetails.compareProductsTitles.textContent())?.trim();
    await productDetails.compareProductsTitles.click();
    await expect(productDetails.productName).toBeVisible({ timeout: 15000 });
    const productTitle = (await productDetails.productName.textContent())?.trim();  
    await homeSteps.ratingPopup();
    expect(productTitle).toBe(compareProductTitle);
  
  });

  test("Verify that the user is navigated to the product details when the 'Buy Now' button is clicked in the 'Compare with similar products' section on the product details page", async ({ page }) => {
    const blog = new blogPage(page);
    const blogoSteps=new BlogSteps(page)
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.productPDP();
    await page.evaluate(() => window.scrollBy(0, 4800));
    await homeSteps.ratingPopup();
    await expect(productDetails.compareProductsBuyNowBtn).toBeVisible({ timeout: 15000 });
    const compareProductTitle = (await productDetails.compareProductsTitles.textContent())?.trim();
    await productDetails.compareProductsBuyNowBtn.click();
    await expect(productDetails.productName).toBeVisible({ timeout: 15000 });
    const productTitle = (await productDetails.productName.textContent())?.trim();
    expect(compareProductTitle).toContain(productTitle);
    
  });

  test("Verify that the user is redirected to the 'Health Articles' page when the 'View All Resources' link is clicked on the product details page", async ({ page }) => {

    const blog = new blogPage(page);
    const blogoSteps=new BlogSteps(page);
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const productDetails = new ProductDetailsPage(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.productPDP();
    await homeSteps.ratingPopup();
    await page.evaluate(() => window.scrollBy(0, 5700));
    await expect(productDetails.relatedArticleHeading).toBeVisible({ timeout: 15000 });
    await expect(productDetails.relatedResourceLink).toBeVisible({ timeout: 15000 });
    await productDetails.relatedResourceLink.click();
    await expect(homePage.kidsVitamin).toBeVisible({ timeout: 15000 });
    const actualTitle = (await homePage.kidsVitamin.textContent())?.trim();
    expect(actualTitle).toBe(testdata.productTitles.healthAricleTitle);

  });


  test("Verify that the 'How to Read a Supplement Label' popup is displayed when the link is clicked in the Ingredients section", async ({ page }) => {
  const blogoSteps=new BlogSteps(page);
  const homeSteps=new HomePageSteps(page);
  const productDetails = new ProductDetailsPage(page);

  await blogoSteps.clickCompanyLogo();
  await homeSteps.productsearch("Biotin");
  await homeSteps.ratingPopup();
  const product = productDetails.searchPageProdTitle(2);
  await expect(product).toBeVisible({ timeout: 15000 });
  await product.click();
  await productDetails.howToReadSupplementLabel.scrollIntoViewIfNeeded();
  await expect(productDetails.howToReadSupplementLabel).toBeVisible();
  await productDetails.howToReadSupplementLabel.click();
  await expect(productDetails.howToReadSupplementModal).toBeVisible({ timeout: 15000 });
  const modalText = (await productDetails.howToReadSupplementModal.textContent())?.trim();
  expect(modalText).toBe(testdata.productDetailsPage.howtoreadsupplementlabel);
  

  });

});

test.describe("Cart Page", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let productSteps;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page); 
    const productSteps=new productDetailSteps(page)
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });
  test("Verify that the quantity of the Products is increased when the user clicks on '+' icon in the Cart page", async ({ page }) => {
    const blog = new blogPage(page);
    const blogoSteps=new BlogSteps(page);
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const cart = new cartPage(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const price = cart.cartProductPrice(1);
    await expect(price).toBeVisible({ timeout: 15000 });
    const initialPriceText = (await price.textContent())?.trim();
    const increaseBtn = cart.cartIncreaseorDecrease(3);
    await expect(increaseBtn).toBeVisible();
    await increaseBtn.click();
    await expect(price).not.toHaveText(initialPriceText || '', {
      timeout: 15000
    });
    const updatedPriceText = (await price.textContent())?.trim();
    const initialPrice = Number(initialPriceText.replace(/[^0-9.]/g, ''));
    const updatedPrice = Number(updatedPriceText.replace(/[^0-9.]/g, ''));
    expect(updatedPrice).toBeGreaterThan(initialPrice);
    await blogoSteps.clickCompanyLogo();

  });

  test("Verify that the quantity of the Products is decreased when the user clicks on '-' icon in product details page", async ({ page }) => {
    const blog = new blogPage(page);
    const blogoSteps=new BlogSteps(page);
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const cart = new cartPage(page);
  
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const increaseBtn = cart.cartIncreaseorDecrease(3);
    await expect(increaseBtn).toBeVisible({ timeout: 15000 });
    await increaseBtn.click();
    const price = cart.cartProductPrice(1);
    await expect(price).toBeVisible();
    const increasedPriceText = (await price.textContent())?.trim();
    const decreaseBtn = cart.cartIncreaseorDecrease(1);
    await expect(decreaseBtn).toBeVisible();
    await decreaseBtn.click();
    await expect(price).not.toHaveText(increasedPriceText || '', {
      timeout: 15000
    });
    const decreasedPriceText = (await price.textContent())?.trim();  
    const increasedPrice = Number(increasedPriceText.replace(/[^0-9.]/g, ''));
    const decreasedPrice = Number(decreasedPriceText.replace(/[^0-9.]/g, ''));
    expect(decreasedPrice).toBeLessThan(increasedPrice);
  
  });

  test("Verify that the 'Product' is removed successfully from the cart when user taps on the 'Delete' icon in the cart page", async ({ page }) => {
    const blog = new blogPage(page);
    const blogoSteps=new BlogSteps(page);
    const homePage = new HomePage(page);
    const homeSteps=new HomePageSteps(page);
    const cart = new cartPage(page);
    const cartDetails=new CartPageSteps(page)
  
    await blogoSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const deleteBtn = cart.cartDeleteBtn(1);
    await expect(deleteBtn).toBeVisible({ timeout: 15000 });
    await deleteBtn.click();
    await cartDetails.validationForEmptyCart()
  
  });

  test("Verify that the user is redirected to Homepage when 'Company logo' button is clicked in the cart page", async ({ page }) => {
    const blogoSteps=new BlogSteps(page);
    const homeSteps=new HomePageSteps(page);
    const cart = new cartPage(page);
  
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    await expect(cart.companyLogo).toBeVisible({ timeout: 15000 });
    await cart.companyLogo.click();
    await homeSteps.validateBannerText();
    await blogoSteps.clickCompanyLogo();
  
  });

  test("Verify that the user is redirected to 'Homepage' when 'Continue Shopping' button is clicked in the cart page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart = new cartPage(page);

    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const continueShopping = cart.cartContinueShoppingLink;
    await expect(continueShopping).toBeVisible({ timeout: 15000 });
    await continueShopping.click();
    await homeSteps.validateBannerText();

  })  

  test("Verify that the user is navigated to product details page when product image is clicked in the cart page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart = new cartPage(page);
    const productDetails=new ProductDetailsPage(page);
  
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const cartTitle = cart.cartProductTitle(1);
    await expect(cartTitle).toBeVisible({ timeout: 15000 });
    const titleFromCart = (await cartTitle.textContent())?.trim();
    const productImage = cart.cartproductImage(1);
    await expect(productImage).toBeVisible();
    await productImage.click();
    await expect(productDetails.productName).toBeVisible({ timeout: 15000 });
    const titleFromPDP = (await productDetails.productName.textContent())?.trim();  
    expect(titleFromPDP).toBe(titleFromCart);
  
  });

  test("Verify that the user is navigated to product details page when product title is clicked in the cart page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart = new cartPage(page);
    const productDetails=new ProductDetailsPage(page)

    await homeSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const cartTitle = cart.cartProductTitle(1);
    await expect(cartTitle).toBeVisible({ timeout: 15000 });
    const titleFromCart = (await cartTitle.textContent())?.trim();
    await cartTitle.click();
    await expect(productDetails.productName).toBeVisible({ timeout: 15000 });
    const titleFromPDP = (await productDetails.productName.textContent())?.trim();

    expect(titleFromPDP).toBe(titleFromCart);

  });

  test("Verify that the user is navigated to Checkout page when 'Checkout' option is clicked in the cart page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cartDetails=new CartPageSteps(page);
    const info=new InformationSteps(page);
    const infoDetails=new InformationPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    await cartDetails.verifyCartPage(); 
    await expect(infoDetails.contactHeading).toBeVisible({ timeout: 15000 });
    const contactHeading = (await infoDetails.contactHeading.textContent())?.trim();
    expect(contactHeading).toBe(testdata.informationpage.contctInfrmtionnHeading);
    await info.clickCompanylogo();
  
  });

  test("Verify that the price is decreased when 'Subscribe & Save' radio button is selected in the cart page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart = new cartPage(page);
  
    await homeSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const price = cart.cartProductPrice(1);
    await expect(price).toBeVisible({ timeout: 15000 });
    const initialPriceText = (await price.textContent())?.trim();
    const subscribeRadio = cart.cartRadioButtons(2);
    await expect(subscribeRadio).toBeVisible();
    await subscribeRadio.click();
  
    await expect(price).not.toHaveText(initialPriceText || '', {
      timeout: 15000
    });
    const updatedPriceText = (await price.textContent())?.trim();
    const initialPrice = Number(initialPriceText.replace(/[^0-9.]/g, ''));
    const updatedPrice = Number(updatedPriceText.replace(/[^0-9.]/g, ''));
    expect(updatedPrice).toBeLessThan(initialPrice);
  
  });

  test("Verify that the original price is displayed when 'One Time Purchase' radio button is selected on the cart page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart=new cartPage(page)
    
    await homeSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const price = cart.cartProductPrice(1);
    await expect(price).toBeVisible({ timeout: 15000 });
    const initialPriceText = (await price.textContent())?.trim();
    const oneTimeRadio = cart.cartRadioButtons(1);
    await expect(oneTimeRadio).toBeVisible();
    await oneTimeRadio.click(); 
    await expect(price).not.toHaveText(initialPriceText || '', {
      timeout: 15000
    }); 
    const updatedPriceText = (await price.textContent())?.trim();
    const initialPrice = Number(initialPriceText.replace(/[^0-9.]/g, ''));
    const updatedPrice = Number(updatedPriceText.replace(/[^0-9.]/g, ''));
    expect(updatedPrice).toBeGreaterThan(initialPrice);
    await homeSteps.clickCompanyLogo();
  
  });

  test("Verify that the 'Subscription Policy' popup is displayed when the link is clicked on the cart page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart=new cartPage(page)
  
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    const subscribeRadio = cart.cartRadioButtons(2);
    await expect(subscribeRadio).toBeVisible({ timeout: 15000 });
    await subscribeRadio.click();
    const policyLink = cart.cartSubscriptionPolicyLink;
    await policyLink.scrollIntoViewIfNeeded();
    await expect(policyLink).toBeVisible();
    await policyLink.click();
    const modal = cart.cartSubscriptionModalText;
    await expect(modal).toBeVisible({ timeout: 15000 });
    await expect(modal).toContainText(testdata.informationpage.subscriptionpolicy);
  
  });

});

test.describe("Cart Page -1", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let productSteps;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page); 
    const productSteps=new productDetailSteps(page)
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that user can add the products to cart", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart=new cartPage(page)
    const blogoSteps=new BlogSteps(page);
    const productDetails = new ProductDetailsPage(page);
    const cartDetails = new CartPageSteps(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.productsearch(testdata.searchbar.vitamins);
    const productTitle = productDetails.searchPageProdTitle(2);
    await expect(productTitle).toBeVisible({ timeout: 15000 });
    await productTitle.click(); 
    await expect(productDetails.productName).toBeVisible();
    // const priceFromPDP = (await productDetails.productPrice1.textContent())?.trim();
    await expect(productDetails.addToCart).toBeVisible();
    await productDetails.addToCart.click();
    await expect(productDetails.viewMyCart).toBeVisible();
    await productDetails.viewMyCart.click();
    const cartTitle = cart.cartProductTitle(1);
    await expect(cartTitle).toBeVisible();
    const titleFromCart = (await cartTitle.textContent())?.trim();
    const titleFromPDP = (await productDetails.productName.textContent())?.trim();
    expect(titleFromCart).toBe(titleFromPDP);

  });

  test("Verify that the user edited details are updated on the cart when the user edits the details", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart=new cartPage(page)
    const blogoSteps=new BlogSteps(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1()
    const cartTitle = cart.cartProductTitle(1);
    await expect(cartTitle).toBeVisible({ timeout: 15000 });
    const totalPrice =cart.cartTotalPrice
    const increaseBtn = cart.cartIncreaseorDecrease(3);
    await expect(increaseBtn).toBeVisible();
    await increaseBtn.click();
    const initialPriceText = (await totalPrice.textContent())?.trim();
    await expect(totalPrice).not.toHaveText(initialPriceText || '', {
      timeout: 15000
    });
    await expect(totalPrice).toHaveText(testdata.productDetailsPage.cartprice);
    const decreaseBtn = cart.cartIncreaseorDecrease(1);
    await expect(decreaseBtn).toBeVisible();
    await decreaseBtn.click();
    const increasedPriceText = (await totalPrice.textContent())?.trim();
    await expect(totalPrice).not.toHaveText(increasedPriceText || '', {
      timeout: 15000
    });
    await expect(totalPrice).toHaveText(testdata.productDetailsPage.cartprice1);

  });

  test("Verify that Cart page is updated with new values when user changes the quantity of the product", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart=new cartPage(page)
    const blogoSteps=new BlogSteps(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.clickCompanyLogo();
    await homeSteps.AddtoCart1();
    const totalPrice = cart.cartTotalPrice;
    const increaseBtn = cart.cartIncreaseorDecrease(3);
    await expect(increaseBtn).toBeVisible({ timeout: 15000 });
    await increaseBtn.click();
    const priceAfterAddText = (await totalPrice.textContent())?.trim();
    await expect(totalPrice).not.toHaveText(priceAfterAddText || '', {
      timeout: 15000
    });
    await expect(totalPrice).toHaveText(testdata.productDetailsPage.cartprice);
    const decreaseBtn = cart.cartIncreaseorDecrease(1);
    await expect(decreaseBtn).toBeVisible();
    await decreaseBtn.click();
    const priceAfterIncreaseText = (await totalPrice.textContent())?.trim();
    await expect(totalPrice).not.toHaveText(priceAfterIncreaseText || '', {
      timeout: 15000
    });
    await expect(totalPrice).toHaveText(testdata.productDetailsPage.cartprice1);

  });


  test("Verify that the added Product information is displayed in the cart dialog when user adds product to the cart", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart=new cartPage(page)
    const blogoSteps=new BlogSteps(page);
    const productDetails = new ProductDetailsPage(page);
    const cartDetails = new CartPageSteps(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.productPDP();
    await expect(productDetails.productName).toBeVisible({ timeout: 15000 });
    await productDetails.addToCart.scrollIntoViewIfNeeded();
    await expect(productDetails.addToCart).toBeVisible();
    await productDetails.addToCart.click();
    await expect(productDetails.itemAddToCart).toBeVisible();
    await expect(productDetails.itemAddToCart).toHaveText(testdata.productDetailsPage.itemaddtocart);
    await expect(productDetails.cartDialogProductImg).toBeVisible();
    await expect(productDetails.cartDialogProductCount).toHaveText(testdata.productDetailsPage.countTxt);
    await expect(productDetails.cartDialogInProdCount).toHaveText(testdata.productDetailsPage.count);

  });

});

test.describe("Information Page", () => {
  let homeSteps;
  let home;
  let productListPage;
  let productDetails;
  let productSteps;
  let cart;
  let information;
  let info;
  let Payment;
  let blog;
  let blogoSteps;
  let payInfo;

  test.beforeEach(async ({ page }) => {
    home=new HomePage(page)
    homeSteps = new HomePageSteps(page);
    productListPage = new ProductListPage(page);
    productDetails = new ProductDetailsPage(page); 
    const productSteps=new productDetailSteps(page)
    cart = new CartPageSteps(page);
    information = new InformationPage(page);
    Payment=new PaymentSteps(page)
    payInfo=new paymentPage(page)
    info = new InformationSteps(page);
    blog=new blogPage(page);
    blogoSteps=new BlogSteps(page)

    await homeSteps.launchUrl(); 
  });

  test("Verify that the user is navigated to Home Page when Company Logo is clicked on the information page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart=new cartPage(page)
    const blogoSteps=new BlogSteps(page);
    const productDetails = new ProductDetailsPage(page);
    const cartDetails = new CartPageSteps(page);
    const info=new InformationPage(page);
    const infoDetails=new InformationSteps(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    await cartDetails.verifyCartPage();
    await expect(info.contactHeading).toBeVisible({ timeout: 15000 });
    await expect(info.contactHeading).toHaveText(testdata.informationpage.contctInfrmtionnHeading);
    await infoDetails.clickCompanylogo();
    await homeSteps.validateBannerText();

  });


  test("Verify that the following details are displayed on the `Contact Information` page - ShopPay button - PayPal button - Account section - Address fields with optional fields marked - Return to Cart link - Continue to shipping button", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cartDetails = new CartPageSteps(page);
    const info=new InformationPage(page);

    await homeSteps.removeAllProductsFromCart();
    await homeSteps.clickCompanyLogo();
    await homeSteps.AddtoCart1();
    await cartDetails.verifyCartPage();
    await expect(info.contactHeading).toBeVisible({ timeout: 15000 });
    await expect(info.contactHeading).toHaveText(testdata.informationpage.contctInfrmtionnHeading);
    await expect(info.emailTextField).toBeVisible();
    await expect(info.address).toBeVisible();
    await expect(info.appartment).toBeVisible();
    await expect(info.returntoCartLink).toBeVisible();
    await expect(info.returntoCartLink).toHaveText(testdata.informationpage.returntocart);
    await expect(info.shippingbutton).toBeVisible();
    await expect(info.shippingbutton).toHaveText(testdata.informationpage.continuetoshipping);

  });

  test("Verify that the following details are displayed in the sidebar on the `Contact Information` page - Products - Coupon Code - Subtotal - Discount - Shipping - Total", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cartDetails = new CartPageSteps(page);
    const info=new InformationPage(page);

    await homeSteps.removeAllProductsFromCart();
    await homeSteps.clickCompanyLogo();
    await homeSteps.AddtoCart1();
    await cartDetails.verifyCartPage();
    await expect(info.informationProductName(1)).toBeVisible({ timeout: 15000 });
    await expect(info.informationProductName(1)).toHaveText(testdata.productNames.vitaminD3K2gummies);
    await expect(info.discountfield).toBeVisible();
    await expect(info.informationshippingPrice).toBeVisible();
    await expect(info.informationshippingPrice).toHaveText(testdata.informationpage.calcutedatstep);
    await expect(info.informationsubTotalPrice).toBeVisible();
    await expect(info.informationsubTotalPrice).toHaveText(testdata.productDetailsPage.cartprice1);
    await expect(info.informationtotalPrice).toBeVisible();
    await expect(info.informationtotalPrice).toHaveText(testdata.productDetailsPage.cartprice1);

  });

  test("Verify that user is redirected to cart page when 'Return to cart' link is clicked on Information page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const homePage=new HomePage(page)
    const cart=new cartPage(page)
    const cartDetails = new CartPageSteps(page);
    const info=new InformationPage(page);

    await homeSteps.removeAllProductsFromCart();
    await homeSteps.clickCompanyLogo();
    await homeSteps.AddtoCart1();
    await cartDetails.verifyCartPage();
    await expect(info.contactHeading).toBeVisible({ timeout: 15000 });
    await expect(info.contactHeading) .toHaveText(testdata.informationpage.contctInfrmtionnHeading);
    await info.returntoCartLink.scrollIntoViewIfNeeded();
    await expect(info.returntoCartLink).toBeVisible();
    await info.returntoCartLink.click();
    await expect(cart.cartHeading).toBeVisible({ timeout: 15000 });
    await expect(cart.cartHeading).toHaveText(testdata.titles.yourCartpage);

  });


  test("Verify that Refund, Privacy, Terms and Cancellation policy dialogs are displayed on Information page", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const blogoSteps=new BlogSteps(page)
    const cart=new cartPage(page)
    const cartDetails = new CartPageSteps(page);
    const info=new InformationPage(page);

    await blogoSteps.clickCompanyLogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    await cartDetails.verifyCartPage();
    await expect(info.contactHeading).toBeVisible({ timeout: 15000 });
    await expect(info.contactHeading).toHaveText(testdata.informationpage.contctInfrmtionnHeading);
    const refundLink = info.informationPolicyLink(1);
    await expect(refundLink).toBeVisible();
    const refundText = await refundLink.textContent();
    await refundLink.click();
    await expect(info.refundPolicyTitle).toBeVisible();
    await expect(info.refundPolicyTitle).toHaveText(refundText?.trim());
    await info.refundSubscriptionPolicyClose.click();
    const privacyLink = info.informationPolicyLink(2);
    await expect(privacyLink).toBeVisible();
    const privacyText = await privacyLink.textContent();
    await privacyLink.click();
    await expect(info.privacyPolicyTitle).toBeVisible();
    await expect(info.privacyPolicyTitle).toHaveText(privacyText?.trim());
    await info.privacyPolicyCloseIcon.click();
    const termsLink =await info.informationPolicyLink(3);
    await expect(termsLink).toBeVisible();
    const termsText =termsLink.textContent();

    await termsLink.click();
    await expect(info.termsofuseTitle).toBeVisible();
    await expect(info.termsofuseTitle).toHaveText(termsText?.trim());

    await info.termsOfServiceCloseIcon.click();

    // -------- Cancellation Policy --------
    const cancelLink = info.informationPolicyLink(4);
    await expect(cancelLink).toBeVisible();
    const cancelText = await cancelLink.textContent();

    await cancelLink.click();
    await expect(info.cancellationpolicyTitle).toBeVisible();
    await expect(info.cancellationpolicyTitle).toHaveText(cancelText?.trim());

    await info.cancellationPolicyCloseIcon.click();

  });


  test("Verify that subtotal price is displayed correctly on Information page after checkout", async ({ page }) => {
    const homeSteps=new HomePageSteps(page);
    const cart=new cartPage(page)
    const info=new InformationPage(page);
    const infoDetails=new InformationSteps(page);

    await infoDetails.clickCompanylogo();
    await homeSteps.removeAllProductsFromCart();
    await homeSteps.AddtoCart1();
    await expect(cart.cartSubTotalPrice).toBeVisible({ timeout: 15000 });
    const cartSubtotalText = (await cart.cartSubTotalPrice.textContent())?.trim();
    const cartSubtotal = cartSubtotalText?.split(" ")[0]; // extract price
    await expect(cart.checkOutBtn).toBeVisible();
    await cart.checkOutBtn.click();
    await expect(info.contactHeading).toBeVisible({ timeout: 15000 });
    await expect(info.contactHeading).toHaveText(testdata.informationpage.contctInfrmtionnHeading);
    await expect(info.informationsubTotalPrice).toBeVisible();
    const infoSubtotal = (await info.informationsubTotalPrice.textContent())?.trim();
    expect(cartSubtotal).toBe(infoSubtotal);

  });


});