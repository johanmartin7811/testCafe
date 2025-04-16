

import { Selector} from 'testcafe';

class checkBoxes {
        constructor() {
        this.all = Selector('input[type="checkbox"]'),
        this.remoteTesting = Selector('[data-testid="remote-testing-checkbox"]'),
        this.reUsing = Selector('[data-testid="reusing-js-code-checkbox"]'),
        this.parallel = Selector('[data-testid="parallel-testing-checkbox"]'),
        this.continuousintegration = Selector('[data-testid="ci-checkbox"]'),
        this.analysis = Selector('[data-testid="analysis-checkbox"]'),
        this.triedTestCafe = Selector('[data-testid="tried-testcafe-checkbox"]')

    };  
}

export default new checkBoxes();
