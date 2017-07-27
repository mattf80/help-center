import { HelpCenterPage } from './app.po';

describe('help-center App', () => {
  let page: HelpCenterPage;

  beforeEach(() => {
    page = new HelpCenterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
