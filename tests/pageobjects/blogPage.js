// @ts-check  ← MUST be line 1, no blank line before it

export class blogPage {
    /** @param {import('@playwright/test').Page} page */
    constructor(page) {
      this.page = page;
  
      // All product titles
      this.facebookforgotAccount = page.locator('#blueBarDOMInspector #login_form tr:nth-child(3)>td:nth-child(2)>div>a');
      
      this.twitterPopUpTitle=page.locator('.css-175oi2r.r-kemksi>div>div:nth-child(1)>div>div:nth-child(1)>div>span');

      this.pinterestTitle=page.locator('.XbT.zI7.iyn.Hsu .Jea.a3i.hs0.zI7.iyn.Hsu h1');

      this.companyLogo=page.locator('#nm-header>div:nth-child(6)>div:nth-child(4)>a>img');

      this.blogTitle=page.locator('.h1.margin-bottom-1');

      this.socialMediaIcons=page.locator('#content-with-sidebar-module>div>div>div:nth-child(2)>nav>ul>li:nth-child(${index})>a');

    }
}