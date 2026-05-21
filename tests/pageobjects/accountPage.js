// @ts-check  ← MUST be line 1, no blank line before it

export class accountPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
      this.page = page;

     this.accountHeading=page.locator('.customer.account>div:nth-child(1)>div>div>div>h1')

     this.logoutLink=page.locator(".logout-link")
    

}
  /** @param {number} index */

accDetailsOrderHis(index){
    return this.page.locator(`.account-details-wrapper>div>div>div:nth-child(1)>div>div>div:nth-child(${index})>a:nth-child(1)`)
}

}