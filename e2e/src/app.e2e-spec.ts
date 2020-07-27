import { AppPage } from './app.po';
import { browser, protractor, by, ExpectedConditions, WebElement } from 'protractor';

describe('Prize App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
 
  });

  it('should not claim prize', () => {
    page.navigateTo();
    browser.sleep(26000);
    expect(page.getDisplayedText().getText()).toEqual('50 Free Spins on Gemix');
  });

  
  it('should be responsive', () => {
    let iniSize = 0;
    browser.manage().window().setSize(900, 900);
    page.navigateTo();
    browser.sleep(2000);

    browser.manage().window().getSize().then((size) => {
      iniSize = size.width;
    });

    browser.manage().window().setSize(400, 900)
    browser.sleep(2000);

    browser.manage().window().getSize().then((size) => {
      expect(size.width).toBeLessThan(iniSize);
    });
  });

  it('should claim prize',  async() => {
    const btn =  page.getButton(); //element(by.id("btnClaim"));
    page.navigateTo();
    browser.sleep(4000);
    await btn.click();
    browser.sleep(2000);
    expect(page.getDisplayedText().getText()).toEqual('You\'ve 50 Free Spins to use now');
  });

});
