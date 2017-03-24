import { PegelOnlineAngularPage } from './app.po';

describe('pegel-online-angular App', () => {
  let page: PegelOnlineAngularPage;

  beforeEach(() => {
    page = new PegelOnlineAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
