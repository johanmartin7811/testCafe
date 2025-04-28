

import { Selector, t } from 'testcafe';

class HomePage {
    async navigateTo() {
        await t.navigateTo('https://devexpress.github.io/testcafe/example/'); // Replace with your actual URL
    }

    constructor() {
        this.main = Selector('.main-content');
        this.nameInput = Selector('[data-testid="name-input"]');
        this.thankYou = Selector('[data-testid="thank-you-header"]');
        this.commentArea = Selector('[data-testid="comments-area"]'),
        this.legends = Selector('legend'), 
        this.labels = Selector('label'),
        this.slider = Selector('#slider'),


        this.button = {
            submit: Selector('[data-testid="submit-button"]'),
            populate: Selector('[data-testid="populate-button"]'),
        }

    };  
}

export default new HomePage();
