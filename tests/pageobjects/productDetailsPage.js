// @ts-check

export class ProductDetailsPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
      this.page = page;
  
      this.productName=page.locator('.product__title.show-for-medium')
      // Add to Cart button
      this.addToCart = page.locator(
        '.product__info-wrapper .product-form__buttons button:nth-child(1)'
      );

      this.cartCancelIcon=page.locator(".cart-notification__close.modal__close-button.link.link--text.focus-inset")

      this.viewMyCart = page.locator(
        '.cart-notification__links a'
      );

      this.productTitles = page.locator(
        '#search-products-list ol li .product-card--title'
      );

      this.bundlesAddToCartBtn=page.locator('.product-form__buttons:nth-child(3) button.product-form__submit')

      this.benefitHeading=page.locator('.pdp-main-benefits-section >div>div>div:nth-child(1)>div:nth-child(1)>h2')

      this.bundlesDropdownName=page.locator("//section[@id='bundle-benefits-section']//nm-select[@data-label='Select Option']//button")

      this.bundlesDropdownList=page.locator("//section[@id='bundle-benefits-section']//nm-select[@data-label='Select Option']//div//ul//li")
      
      this.bundleDescriptions = page.locator(
        '#bundle-benefits-section > div:nth-child(2) > div > div > div > section > div:nth-child(1) > div:nth-child(1) > div > div > div:nth-child(1) > p'
      );

      this.onetimeradiopurchase=page.locator('.rc-radio.rc-option__onetime label .rc-option__text')

      this.subscribesavetenpercentradioPurchase=page.locator('.rc-option__text.subscribe-save')

      this.bundlePrice=page.locator("//product-form[@id='pdp-product-form']//form//div[@class='bundle-price-wrapper']//div[1]")

      this.bundleCompPrice=page.locator("//product-form[@id='pdp-product-form']//form//div[@class='bundle-price-wrapper']//div[1]//span")

      this.bulletIncludesProduct=page.locator("//div[@class='product__info-wrapper grid__item']//bundled-item-list[@class='bundled-item-list']//ul[1]//li//a")
       
      this.productPrice1=page.locator("//span[contains(@class,'rc_widget__price--onetime')]")

      this.subscribedPrice1=page.locator('//div[@class="subsave-option-price-wrapper "]//span[@class="rc-option__price rc_widget__price rc_widget__price--subsave"]')
      
      this.productCount = page.locator('//div[@class="product__info-container"]//variant-radios//fieldset//label');
      
      this.productCount1=page.locator(".js.product-form__input label:nth-child(5)")

      this.productCount90=page.locator('//label[contains(text(),"90")]');
      
      
      this.productCount150=page.locator('//label[contains(text(),"150")]');

      this.itemAddToCart=page.locator(".cart-notification__heading.caption-large");

      this.cartDialogProductImg=page.locator("#cart-notification:nth-child(1)>div:nth-child(2) img")

      this.cartDialogProductCount=page.locator("#cart-notification:nth-child(1)>div:nth-child(2)>div dl dt")
      
      this.cartDialogInProdCount= page.locator("#cart-notification:nth-child(1)>div:nth-child(2)>div dl dd")



      // this.productCount1 = page.locator('input[value="150"]');

      this.pdpProductType=page.locator("#glide-product-benefits>div:nth-child(1)>div>div:nth-child(1)>span:nth-child(2)")
    
      this.cartQuantity=page.locator(".product__info-container .quantity button:nth-child(3)")

      this.ratingCount=page.locator(".product__info-wrapper.grid__item .bv_ratings_summary:nth-child(2) .bv_offscreen_text")
    
      this.productReviewSection=page.locator("//*[@id='pdp-reviews-section']/div[2]/div/h2")

      this.subscribeSaveLearnMore=page.locator(".ss-learn-more>a:nth-child(2)")

      this.compareProductImages=page.locator(".compare-hits-container-product .ais-Hits-list .ais-Hits-item:nth-child(2) .compare-image-wrapper")

      this.compareProductsTitles=page.locator(".compare-hits-container-product .ais-Hits-list .ais-Hits-item:nth-child(2) .title-wrapper")

      this.compareProductsBuyNowBtn=page.locator("//*[@id='compareProducts']/div/div/ul/li[2]/div/div/div[1]/a")

      this.relatedResourceLink=page.locator(".grid-container.hide-on-print:nth-child(4) .view-all-button.view-more--button span")

      this.relatedArticleHeading=page.locator("#related-resources:nth-child(2) >div:nth-child(1) >div:nth-child(1)>div>div>div>h2")

      this.howToReadSupplementLabel=page.locator(".styled-link-primary.styled-link-primary-alt")

      this.howToReadSupplementModal=page.locator("#labelModalNew >h3")
    }
      
      

    /**
     * Get product title by index
     * @param {number} index
     */
    searchPageProdTitle(index) {
        return this.productTitles.nth(index);
      }

    /**
     * Get product title by index
     * @param {number} index
     */
    
    bundlesList(index){
      return this.bundlesDropdownList.nth(index)

    }

        /**
     * Bundle description by index
     * @param {number} index
     */
    bundleDescription(index) {
      return this.bundleDescriptions.nth(index);
    }
    /**
     * Bundle description by index
     * @param {number} index
     */
    bulletedLinkstext(index){
      return this.bulletIncludesProduct.nth(index);
    }

      /**
     * Bundle description by index
     * @param {number} index
     */

    searchPageProductTitle(index) {
      return this.page.locator(`.tabcontent-cus.margin-top-3:nth-child(3) .ais-InfiniteHits ol li:nth-child(${index}) .title-and-ratings-container`)
  }

   /**
     * Bundle description by index
     * @param {number} index
     */

  quantityChangeBtn(index){
    return this.page.locator(`.product__info-wrapper >div:nth-child(1) >div:nth-child(10)  button:nth-child(${index})`);
}

/**
     * Bundle description by index
     * @param {number} index
     */

productsCount(index){
  return this.page.locator(`.product__info-container fieldset label:nth-child(${index})`)
      
}

/**
     * Bundle description by index
     * @param {number} index
     */

plpProductTitle(index){
  return this.page.locator(`.collection-section.shopify-section:nth-child(2) ol li:nth-child(${index}) .product-card--title`)
}

/**
     * Bundle description by index
     * @param {number} index
     */

getProductCountLabelByIndex(index) {
  return this.page.locator(
    `//div[@class="product__info-container"]//variant-radios//fieldset//label[${index}]`
  );
}



  }