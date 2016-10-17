// spec.js
describe('Protractor', function() {
  it('title', function() {
    browser.get('http://localhost:9000/list/');

    expect(browser.getTitle()).toEqual('Application for notes');
  });
});