

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

        this.checkBoxes = {
            all: Selector('input[type="checkbox"]'),
            remoteTesting: Selector('[data-testid="remote-testing-checkbox"]'),
            reUsing: Selector('[data-testid="reusing-js-code-checkbox"]'),
            parallel: Selector('[data-testid="parallel-testing-checkbox"]'),
            continuousintegration: Selector('[data-testid="ci-checkbox"]'),
            analysis: Selector('[data-testid="analysis-checkbox"]'),
            triedTestCafe: Selector('[data-testid="tried-testcafe-checkbox"]')
        }

        this.radioButtons = {
            all: Selector('input[type="radio"]'),
            windows: Selector('[data-testid="windows-radio"]'),
            macOs: Selector('[data-testid="macos-radio"]'),
            linux: Selector('[data-testid="linux-radio"]')
        }

        this.button = {
            submit: Selector('[data-testid="submit-button"]'),
            populate: Selector('[data-testid="populate-button"]'),
        }

        const dropdownSelector = Selector('[data-testid="preferred-interface-select"]');

        this.drowdown = {
            all: dropdownSelector,
            commandline: dropdownSelector.find('option').withAttribute('value', 'Command Line'),
            javascriptApiOption: dropdownSelector.find('option').withAttribute('value', 'JavaScript API'),
            both: dropdownSelector.find('option').withAttribute('value', 'both'),
        }
    };

    

  
}

export default new HomePage();
