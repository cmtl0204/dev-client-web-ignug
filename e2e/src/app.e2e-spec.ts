import { MiragePage } from './app.po';

describe('MiragePage', () => {
    let page: MiragePage;

    beforeEach(() => {
        page = new MiragePage();
    });

    it('should display welcome message', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('Welcome to Mirage!');
    });

});
