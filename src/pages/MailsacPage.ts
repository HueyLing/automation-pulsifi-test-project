import { expect, Page } from '@playwright/test';

export class MailsacPage {
  private page: Page;
  private mailboxInputSelector = '#field_a1xtj';
  private checkMailButtonSelector = '.elementor-button.elementor-button-link.elementor-size-lg';
  private formattedMailbox: string;
  
  constructor(page: Page) {
    this.page = page;
	this.formattedMailbox = this.generateFormattedMailboxName();
  }
  
  // Method to generate the formatted mailbox name
  private generateFormattedMailboxName(): string {
    const now = new Date();
    const dateFormat = now.toISOString().slice(0, 10).replace(/-/g, '');
    const timeFormat = now.toISOString().slice(11, 19).replace(/:/g, '');    
    return `test_${dateFormat}_${timeFormat}`;
  }    

  // Navigate to the Mailsac page	
  async navigate() {
    await this.page.goto('https://mailsac.com');
  }

  // Enter mailbox name in the input field
  async enterMailboxName() {
    await this.page.waitForSelector(this.mailboxInputSelector, { timeout: 20000 });
    await this.page.fill(this.mailboxInputSelector, this.formattedMailbox);
  }

  // Click the "Check the mail!" button
  async clickCheckMailButton() {
    await this.page.waitForSelector(this.checkMailButtonSelector, { state: 'visible', timeout: 20000 });
    await this.page.click(this.checkMailButtonSelector);
  }

  // Verify the correct mailbox address is displayed
  async verifyMailboxAddress() {
    const expectedUrl = `https://mailsac.com/inbox/${this.formattedMailbox}%40mailsac.com`;
    const currentUrl = this.page.url();
    if (currentUrl !== expectedUrl) {
      throw new Error(`Expected URL to be "${expectedUrl}", but got "${currentUrl}"`);
    }

    const displayedEmail = await this.page.locator('h2').textContent();
    if (displayedEmail !== `${this.formattedMailbox}@mailsac.com`) {
      throw new Error(`Expected displayed email to be "${this.formattedMailbox}@mailsac.com", but got "${displayedEmail}"`);
    }
  }
  
  // Verify the correct error message when mailbox text field is empty 
  async verifyMailboxErrorCannotBeBlank() {
	const inputElement = await this.page.waitForSelector(this.mailboxInputSelector, { timeout: 20000 });
    const reqMsg = await inputElement.getAttribute('data-reqmsg');
    expect(reqMsg).toBe("This field cannot be blank.");

    const ariaRequired = await inputElement.getAttribute('aria-required');
    expect(ariaRequired).toBe("true");
  }
}
