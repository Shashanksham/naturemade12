import { testdata } from '../constants/testdata';
import { expect } from '@playwright/test';
import { blogPage } from '../pageobjects/blogPage';

export class BlogSteps {
  constructor(page) {
    this.page = page;
    this.blog = new blogPage(page);
  }

  // 🏢 Click company logo
  async clickCompanyLogo() {
    await this.blog.companyLogo.waitFor({ state: 'visible' });
    await this.blog.companyLogo.click();
  }
}