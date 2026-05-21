// @ts-check  ← MUST be line 1, no blank line before it

export class faqPage{
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
      this.page = page;

     this.faqHeading=page.locator('.faq-get-in-touch .grid-container:nth-child(1) h1')

     this.faqSearchTextField=page.locator("//*[@id='shopify-section-nm-acf-faq-page']/div/div/div/div[1]/div")

     this.faqSearchedProduct=page.locator('h2:has-text("Multivitamin For Her Tablets")');

     this.faqDropdownIcon= page.locator('button[aria-controls="nature-made-biotin-gummies-region"]');

     this.questionDropdownIcon=page.locator('accordion-item.main-pdp-faq.is-active li:nth-child(1) accordion-item button')

     this.questionAns=page.locator('#what-does-biotin-help-with-3000-mcg-biotin-gummies-for-hair-skin-nails-region')

}

}
module.exports = faqPage;