import { Miniprojmean2Page } from './app.po';

describe('miniprojmean2 App', function() {
  let page: Miniprojmean2Page;

  beforeEach(() => {
    page = new Miniprojmean2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
