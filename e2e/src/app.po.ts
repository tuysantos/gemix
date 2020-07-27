import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getButton() {
    // element(by.id('btnClaim')).
    return element(by.id("btnClaim"));
    // return element(by.buttonText('Claim now'));
  }

  getDisplayedText() {
    return element(by.id('strMessage'));
  }

  getContainerWrapper() {
    return element(by.css(".container-wrapper"));
  }
}
