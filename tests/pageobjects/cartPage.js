// @ts-check  ← MUST be line 1, no blank line before it

export class cartPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
      this.page = page;
  
      // All product titles
      this.cartHeading = page.locator('.ais-InfiniteHits-item .product-card--title');

      this.checkOutBtn=page.locator('.cart__ctas button')

      this.cartBundlePrice=page.locator("//cart-items[@class='grid-x ']//form//table//td[2]//div[@class='bundle-price']")

      this.cartBundleCompPrice=page.locator("//cart-items[@class='grid-x ']//form//table//td[2]//div[@class='bundle-price']//span")

      this.cartTotalPrice=page.locator("//cart-items[@class='grid-x ']//form//table//td[4]//div[2]//span")

      this.emptyCartPage=page.locator(".cart__warnings h1")

      this.companyLogo=page.locator(".header-logo-wrapper.padding-horizontal-1 a img")

      this.cartContinueShoppingLink=page.locator(".grid-container.grid-container-cart>cart-items>div:nth-child(1)>a")

      this.cartSubscriptionPolicyLink=page.locator(".tax-note.caption-large.rte .btn-sub-disclaimer-modal.btn-policy-modal")

      this.cartSubscriptionModalText=page.locator(".policy-modal.fancybox__content h2")

      this.cartSubTotalPrice=page.locator(".totals__subtotal-value")
    
    }
     /**
     * Get product title by index
     * @param {number} index
     */

    cartProductPrice(index){
      return this.page.locator(`#cart:nth-child(3) tbody tr:nth-child(${index}) td:nth-child(5) .price.price--end`);
  }
 /**
     * Get product title by index
     * @param {number} index
     */
   cartIncreaseorDecrease(index){
    return this.page.locator(`#main-cart-items>div>table>tbody>tr:nth-child(1)>td:nth-child(4)>quantity-input>button:nth-child(${index})`)
}
 /**
     * Get product title by index
     * @param {number} index
     */

  cartProductTitle(index){
    return this.page.locator(`#main-cart-items>div>table>tbody>tr:nth-child(${index})>td:nth-child(3)>a`)
  }

  /**
       * Bundle description by index
       * @param {number} index
       */

  productCountInCart(index){
    return this.page.locator(`#main-cart-items>div>table>tbody>tr:nth-child(${index})>td:nth-child(3)>dl>div>dd`)
  }

  /**
       * Bundle description by index
       * @param {number} index
       */

  cartDeleteBtn(index) {
    return this.page.locator(`#main-cart-items>div>table>tbody>tr:nth-child(${index})>td:nth-child(4)>cart-remove-button>a`)
}

/**
       * Bundle description by index
       * @param {number} index
       */

  cartproductImage(index){
    return this.page.locator(`#main-cart-items>div>table>tbody>tr:nth-child(${index})>td:nth-child(2)>a>img`)
  }

  /**
       * Bundle description by index
       * @param {number} index
       */

  cartRadioButtons(index){
    return this.page.locator(`#main-cart-items>div>table>tbody>tr:nth-child(1)>td:nth-child(3)>div>div:nth-child(${index})>div>label`)
}

}