// @ts-check  ← MUST be line 1, no blank line before it

export class ProductListPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
      this.page = page;
  
      // All product titles
      this.productTitles = page.locator('.ais-InfiniteHits-item .product-card--title');

      this.collectionJumpLinks = page.locator(
        '.intro-hero-content-wrapper div jump-link button'
      ); 

      this.bundlesInPLP_BuyNowBtns = page.locator(
        '.ais-InfiniteHits-item .button'
      ); 
      
      this.getStartedImage=page.locator('.main-nav-grandchild-links-wrapper.menu-with-icons.layout-image.is-active>div>div>a:nth-child(1)>img')
      
      this.getStartedNow=page.locator('.main-nav-grandchild-links-wrapper.menu-with-icons.layout-image.is-active>div>div>a:nth-child(3)')

      this.marketingCard=page.locator('#SubCollectionProductGrid>div:nth-child(1)>div:nth-child(5) li:nth-child(6)>div>div>div>a>img')

      this.filterIcon=page.locator('#CollectionFiltersForm>div:nth-child(1)>div>button')

      this.filterClearAllLink=page.locator('.products-list-filters-title a')

      this.applyFilterBtn=page.locator('.button.button-primary.is-full')

      this.prodTitlesForFilter1=page.locator('.collection-section.has-sub-collections .product-card--title')

      this.filterCount=page.locator('.filter-count')

      this.clearAllInFilter=page.locator('.clear-filters.text-center')

      this.plpViewMoreLink=page.locator('.ais-InfiniteHits-loadMore.active .styled-link-primary')

      this.collectionSubTitle=page.locator('.grid-container.product-list-container .collection-section.shopify-section:nth-child(2) .sub-collection-template-title')
    
      this.relatedArticleHeading=page.locator('#related-resources:nth-child(2) h2')

      this.productBestSellerBadge=page.locator('.collection-filters .collection-section .ais-InfiniteHits ol li .item-status.has-green-background')
    
      this.productNewBadge=page.locator('.ais-InfiniteHits ol li .card-image--container .item-status.has-red-background')
    
      this.relatedResourceLink=page.locator(".related-resources.padding-vertical-3 .grid-container .view-all-button.view-more--button")

      this.sortByFilter=page.locator('#filters-list-wrapper>div:nth-child(1)>button>span')

      this.exploreMoreHeading=page.locator('#others-are-buying>div>div>div>h2')







    }

  
    /**
     * Get product title by index
     * @param {number} index
     */
    bundlesInPLP_ProdTitles(index) {
      return this.productTitles.nth(index);
    }

    /**
   * Get collection jump link by index
  //  * @param {number} index
  //  */
  //   collectionJumpLink(index) {
  //     return this.collectionJumpLinks.nth(index);
  //   }

    

    /**
 * Buy Now button by index
 * @param {number} index
 */
  bundlesInPLP_BuynowBtns(index) {
    return this.bundlesInPLP_BuyNowBtns.nth(index);
  }

  /**
     * Get product title by index
     * @param {number} index
     */

  productsFilterCheckboxHeading(index) {
    return this.page.locator(`.products-list-filters .filters-list-wrapper .filter-item-group.js-filter.hide-facet:nth-child(${index})`)
}

/**
     * Get product title by index
     * @param {number} index
     */

gummyCheckbox(index) {
  return this.page.locator(`.filter-item-group.js-filter:nth-child(3)>div:nth-child(3)>ul>li:nth-child(${index})>input`)
      
}

/**
     * Get product title by index
     * @param {number} index
     */

productFilterCheckboxHeading(index) {
  return this.page.locator(`.products-list-filters .filters-list-wrapper .filter-item-group.js-filter.hide-facet:nth-child(${index})`)
}

/**
     * Get product title by index
     * @param {number} index
     */
priceFilters(index){
  return this.page.locator(`.filters-list-wrapper .filter-item-group.js-filter:nth-child(2) .facets__display-vertical ul li:nth-child(${index})`)
}

/**
     * Get product title by index
     * @param {number} index
     */

productPriceForFilter(index) {
  return this.page.locator(`.collection-section.has-sub-collections .ais-InfiniteHits-list li:nth-child(${index}) .item-price`)
  }

/**
     * Get product title by index
     * @param {number} index
     */

  filterSort(index){
    return this.page.locator(`.filter-item-group.filter-item-group-sortby .facets__display-vertical .sort-by-product ul li:nth-child(${index})`)
        // #sort-by-products>ul>li:nth-child(${index})>label
}

/**
     * Get product title by index
     * @param {number} index
     */

productTitlesForFilter(index){
  return this.page.locator(`.collection-section.has-sub-collections .ais-InfiniteHits-list li:nth-child(${index}) .product-card--title`)
}

  /**
     * Get product title by index
     * @param {number} index
     */
plpProductTypePrice(index){
    return this.page.locator(`.collection-section.has-sub-collections .ais-InfiniteHits-list li:nth-child(${index}) .item-price`)  
        
}
/**
     * Get product title by index
     * @param {number} index
     */

plpProductRating(index){
  return this.page.locator(`.collection-section.has-sub-collections .ais-InfiniteHits-list li:nth-child(${index}) .inline-star-ratings`)
}

/**
     * Get product title by index
     * @param {number} index
     */

plpProductBuynow(index){
  return this.page.locator(`.inner-collection.inner-collection_170693034081 >div>div>ol>li:nth-child(${index}) a`)
}

/**
     * Get product title by index
     * @param {number} index
     */

productCard(index){
  return this.page.locator(`.grid-container.section-padding-vertical .ais-InfiniteHits-list li:nth-child(${index})`);
      // #CollectionProductGrid > div:nth-child(1) ol li:nth-child(${index})
}


/**
     * Get product title by index
     * @param {number} index
     */

collectionJumpLink(index) {
  return this.page.locator(`.intro-hero-content-wrapper div:nth-child(${index})>jump-link>button`);
}

/**
     * Get product title by index
     * @param {number} index
     */

productFilterOptions(index) {
  return this.page.locator(`.filters-list-wrapper .filter-item-group.js-filter.hide-facet:nth-child(${index})`)
}

/**
     * Get product title by index
     * @param {number} index
     */

productFilterFeatureCheckboxes(index) {
  return this.page.locator(`.products-list-filters:nth-child(2) .filter-item-group.js-filter:nth-child(1)>div:nth-child(3)>ul>li:nth-child(${index})>input `)
}

/**
     * Get product title by index
     * @param {number} index
     */

countFilterOption(index){
  return this.page.locator(`.products-list-filters:nth-child(2) .filter-item-group.js-filter:nth-child(5)>div:nth-child(3)>ul>li:nth-child(${index})>input`)
}

/**
     * Get product title by index
     * @param {number} index
     */
shopifyProductImg(index){
  return this.page.locator(`.grid-container.product-list-container .ais-InfiniteHits ol li:nth-child(${index}) .card-image--container`)
}

/**
     * Get product title by index
     * @param {number} index
     */

filterProductType(index){
  return this.page.locator(`.filter-item-group.js-filter:nth-child(3) .filter-items-wrapper >li:nth-child(${index}) input`);
}

/**
     * Get product title by index
     * @param {number} index
     */

exploreMoreTab(index){
  return this.page.locator(` #related-tab-component >div:nth-child(1) button:nth-child(${index})`)
}

/**
     * Get product title by index
     * @param {number} index
     */

brainCheckbox(index){
  return this.page.locator(`#FacetsWrapperDesktop>div:nth-child(${index})>button>span`)
}

/**
     * Get product title by index
     * @param {number} index
     */

melatoninProductType(index){
  return this.page.locator(`.filter-item-group:nth-child(3) ul li:nth-child(${index}) input`)

}

melatoninProductTypeText(index){
  return this.page.locator(`.filter-item-group:nth-child(3) ul li:nth-child(${index}) input`)

}

/**
     * Get product title by index
     * @param {number} index
     */

brainCountCheckbox(index){
  return this.page.locator(`.filter-item-group:nth-child(5) ul li:nth-child(${index}) label`)
}

/**
     * Get product title by index
     * @param {number} index
     */
articleTitle(index){
  return this.page.locator(`#related-resources:nth-child(2)>div:nth-child(1)>div:nth-child(2) li:nth-child(${index}) a>div>h3`)
}

/**
     * Get product title by index
     * @param {number} index
     */

bundlesInPLPProdTitles(index) {
  return this.page.locator(`.ais-InfiniteHits-item:nth-child(${index}) .product-card--title`)
}


  }
  