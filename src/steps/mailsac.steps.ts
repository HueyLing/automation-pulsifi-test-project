import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from '@playwright/test';
import { MailsacPage } from '../pages/MailsacPage';

let browser: Browser;
let page: Page;
let mailsacPage: MailsacPage;

Given('I navigate to the Mailsac website', async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  mailsacPage = new MailsacPage(page);
  await mailsacPage.navigate();
});

When('I enter a formatted mailbox name and click check email button', { timeout: 20000 }, async () => {
  await mailsacPage.enterMailboxName();
  await mailsacPage.clickCheckMailButton();
});

Then('I should see the correct mailbox address on the redirected page', { timeout: 20000 }, async () => {
  await mailsacPage.verifyMailboxAddress();
  await browser.close();
});

When('I enter an empty mailbox and click check email button', { timeout: 20000 }, async () => {
  await mailsacPage.clickCheckMailButton();
});   

Then('I should see validation error "This field cannot be blank"', { timeout: 20000 }, async () => {
  await mailsacPage.verifyMailboxErrorCannotBeBlank();
  await browser.close();
});