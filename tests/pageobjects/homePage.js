 // @ts-check  ← MUST be line 1, no blank line before it

export class HomePage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;

    /** @type {import('@playwright/test').Locator} */
    this.enterUsingPwd = page.locator('.modal__toggle-open.password-link.link');

    /** @type {import('@playwright/test').Locator} */
    this.pwdEnterField = page.locator('#Password');

    /** @type {import('@playwright/test').Locator} */
    this.enterBtn = page.locator('//button[@class="password-button button button--outline"]');

    /** @type {import('@playwright/test').Locator} */
    this.acceptCookieButton = page.locator('#onetrust-button-group-parent:nth-child(2)>div>button:nth-child(3)');

    /** @type {import('@playwright/test').Locator} */
    this.subscribeCancelIcon = page.locator('.subscribe-cancel-icon');

    /** @type {import('@playwright/test').Locator} */
    this.bannerName = page.locator('//h1[@class="sr-only"]');

    /** @type {import('@playwright/test').Locator} */
    this.cmpnyLogo = page.locator('//div[contains(@class,"header-logo-wrapper")]//a');

    /** @type {import('@playwright/test').Locator} */
    this.signinLink = page.locator('.list-menu li:nth-child(2) a');

    /** @type {import('@playwright/test').Locator} */
    this.loginPage = page.locator('//div[@id="CustomProperties-P0-0"]//h1');

    /** @type {import('@playwright/test').Locator} */
    this.searchField = page.locator('#Search-In-Template');

    /** @type {import('@playwright/test').Locator} */
    this.searchBtn = page.locator('//nav[contains(@class,"header__inline-menu")]//form//button[@aria-label="Search"]');

    /** @type {import('@playwright/test').Locator} */
    this.searchTitle = page.locator('#search-title');

    this.preHeader = page.locator('.preheader');

    this.searchResult = page.locator('#search-title');

    // /** @type {import('@playwright/test').Locator} */
    // this.productImages = page.locator('//*[@id="CollectionFiltersForm"]//*[@id="search-products-list"]//li//div//img');

    this.headersubMenu = page.locator('.main-nav-child-links-wrapper ul li:nth-child(6) a');

    this.headerMenuLink = page.locator('#desktop-alt-menu > div > ul > li > button');

    this.emptyCartPage=page.locator('.cart__warnings h1')

    this.cart=page.locator('.header.grid-container .header__icons')

    this.kidsVitamin=page.locator('.intro-hero-content-wrapper>h1:nth-child(3)');

    this.checkOutBtnInCartDialog=page.locator('#cart-preview-button');

    this.cartDeleteBtns=page.locator('#main-cart-items>div>table>tbody>tr>td:nth-child(4)>cart-remove-button>a');

    this.newBannerTitle=page.locator('.enhanced-intro-hero.padding-vertical-3 >div>div:nth-child(2)>div:nth-child(2)>div>h1');

    this.pdpBadge=page.locator('.product__title.show-for-medium');

    this.viewAllBestSellerLink=page.locator('.main-nav-grandchild-links-wrapper.is-active div:nth-child(1) a.view-all-cta.button')

    this.findYourMultivitaminsLink=page.locator('#desktop-alt-menu>div>ul>li:nth-child(2)>div>div>div:nth-child(2)>a:nth-child(3)')

    this.newRatingCancelIcon=page.locator(".QSIWebResponsiveDialog-Layout1-SI_aVSkA8aBjT8gItw_close-btn-container:nth-child(1) > button img")
    
    this.email=page.locator("#customer_login #CustomerEmail")

    this.password=page.locator("#CustomerPassword")

    this.signIn=page.locator("#customer_login button")

    this.cancelIconOnPrevCartPopUP=page.locator("#persistent-modal button:nth-child(2)")

    this.whereToBuyLink=page.locator(".header__inline-menu ul li:nth-child(1) span:nth-child(1)")

    this.exploreHealthResourcesLink=page.locator("#desktop-alt-menu>div>ul>li:nth-child(3)>div>div>div:nth-child(2)>a:nth-child(3)")

    this.discoverNatureMadeLink=page.locator("#desktop-alt-menu>div>ul>li:nth-child(4)>div>div>div:nth-child(2)>a:nth-child(3)")
  
    this.homeBestSellersProducts=page.locator(".tab-control-buttons-container>button:nth-child(4)")
  
    this.homeNewProducts=page.locator(".tab-control-buttons-container>button:nth-child(2)")

    this.learnAboutUsBtn=page.locator("#consumer-education div:nth-child(2)>div:nth-child(2)>a")

    this.cartView=page.locator('#cart-notification-button')

    this.cartQuantity=page.locator('.product__info-container .quantity button:nth-child(3)')

    this.productTitle=page.locator('.collection-section.shopify-section:nth-child(1) .inner-collection .ais-InfiniteHits ol li:nth-child(2)')
  
  
  
  }

  /** @param {number} index */
  searchPageProdImage(index) {
    return this.page.locator(`#search-results-list #tab-1 .ais-InfiniteHits>ol>li:nth-child(${index})>div>div:nth-child(3) img`);
  }

  /** @param {number} index */

  headerSubMenu(index) {  
    return this.page.locator(`#desktop-alt-menu>div>ul>li:nth-child(1)>div>div>div>ul>li:nth-child(${index})>a`)
  }

  /** @param {number} index */
  headerSubMenus(index){
    return this.page.locator(`//div[@class='main-nav-child-links-wrapper']//ul//li[${index}]//button`);  

  }

  /**
   * @param {number} index
   * @param {number} index1
   */
  productListHeaderAtoZ(index, index1) {
    return this.page.locator(
      `.main-nav-grandchild-links-wrapper.is-active.main-nav_a-z ul:nth-child(2) > div:nth-child(${index}) li:nth-child(${index1}) a`
    );
  }

  /** @param {number} index */

  headerLinks(index) {
    return this.page.locator(`#desktop-alt-menu > div > ul > li:nth-child(${index}) > button`);
  }

  /** @param {number} index */
     atoZSubMenu(index) {
      return this.page.locator(`#desktop-alt-menu>div>ul>li:nth-child(1)>div>div>div>ul>li:nth-child(${index})>button>span:nth-child(1)`)
  }

    /** @param {number} index */
  productsHeadersubmenus(index) {
      return this.page.locator(`#desktop-alt-menu>div>ul>li:nth-child(1)>div>div>div>ul>li:nth-child(${index})>button`)
  }

      /** @param {number} index */
  byBenefitsSubmenuLinks(index){
    return this.page.locator(`.main-nav-grandchild-links-wrapper.menu-with-icons ul li:nth-child(${index}) a`)
}

    /** @param {number} index */
     gummiesHeaderLink(index){
      return this.page.locator(`.main-nav-grandchild-links-wrapper.is-active ul li:nth-child(${index}) a`)
  }

   /** @param {number} index */
  bestSellerProdImg(index){
    return this.page.locator(`.main-nav-grandchild-links-wrapper.is-active div:nth-child(${index}) >div>a:nth-child(1) img`)
  }

   /** @param {number} index */
   bestSellerProdTitle(index){
    return this.page.locator(`.main-nav-grandchild-links-wrapper.is-active div:nth-child(${index}) >div>a:nth-child(1)>p`)
  }

   /** @param {number} index */
   bestSellerBuyNowBtn(index){
    return this.page.locator(`.main-nav-grandchild-links-wrapper.is-active div:nth-child(${index}) >div>a:nth-child(2)`)
  }

     /** @param {number} index */

  searchTitleDropdown(index){
    return this.page.locator(`#predictive-search-results-list div:nth-child(1)>span>div:nth-child(${index})>div>div:nth-child(2)>p:nth-child(1)`)
}
       /** @param {number} index */

  preSuggestedSearch(index){
    return this.page.locator(`#nm-header>div:nth-child(6)>nav>ul>li:nth-child(4)>form>span>span:nth-child(${index})>a`)
  }

       /** @param {number} index */

  findVitaminsForMeSubmenu(index){
    return this.page.locator(`#desktop-alt-menu>div>ul>li:nth-child(2)>div>div>div:nth-child(1)>ul>li:nth-child(${index})>a`);
}

       /** @param {number} index */

  tipsAndResourcesSubmenu(index){
    return this.page.locator(`#desktop-alt-menu>div>ul>li:nth-child(3)>div>div>div:nth-child(1)>ul>li:nth-child(${index})>a`);
  }

  /** @param {number} index */

  aboutusSubmenu(index){
    return this.page.locator(`#desktop-alt-menu>div>ul>li:nth-child(4)>div>div>div:nth-child(1)>ul>li:nth-child(${index})>a`)
  }

  /** @param {number} index */

  productImgs(index){
    return this.page.locator(`.innovations-tab.tab-component__tab--visible .ais-InfiniteHits-list.glide__slides li:nth-child(${index}) .card-image--container`);
}

  /** @param {number} index */

productTitleText(index){
  return this.page.locator(`.innovations-tab.tab-component__tab--visible .ais-InfiniteHits-list.glide__slides li:nth-child(${index}) .product-card--title`);
}

  /** @param {number} index */

newProductImages(index){
  return this.page.locator(`.innovations-tab.tab-component__tab--visible .ais-InfiniteHits-list.glide__slides li:nth-child(${index}) .card-image--container`);
}

  /** @param {number} index */

newProductTitleTxt(index){
  return this.page.locator(`.innovations-tab.tab-component__tab--visible .ais-InfiniteHits-list.glide__slides li:nth-child(${index}) .product-card--title`)       
}

/** @param {number} index */

productRatings(index){
  return this.page.locator(`.innovations-tab.tab-component__tab--visible .ais-InfiniteHits-list.glide__slides li:nth-child(${index}) .rating-star.color-icon-text`);
}

/** @param {number} index */

bestSellerBuyNowBtns(index){
  return this.page.locator(`.innovations-tab.tab-component__tab--visible .ais-InfiniteHits-list.glide__slides li:nth-child(${index}) .card-link`);
}

/** @param {number} index */

newProductRatings(index){
  return this.page.locator(`.innovations-tab.tab-component__tab--visible .ais-InfiniteHits-list.glide__slides li:nth-child(${index}) .rating-star.color-icon-text`);  
}

/** @param {number} index */

newProductBuyNowBtns(index){
  return this.page.locator(`.innovations-tab.tab-component__tab--visible .ais-InfiniteHits-list.glide__slides li:nth-child(${index}) .card-link`)
}
/** @param {number} index */


aboutusBtn(index){
  return this.page.locator(`#consumer-education div:nth-child(1)>div:nth-child(${index})>a>img:nth-child(1)`);
}

/** @param {number} index */

cartProductPrice(index){
  return this.page.locator(`#cart:nth-child(3) tbody tr:nth-child(${index}) td:nth-child(5) .price.price--end`);
}








    /** @param {number} index */

  deleteBtn(index) {
    return this.cartDeleteBtns.nth(index); // 0-based index
  }
}