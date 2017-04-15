import { SmileFreshPage } from './app.po';

describe('smile-fresh App', () => {
  let page: SmileFreshPage;

  beforeEach(() => {
    page = new SmileFreshPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
