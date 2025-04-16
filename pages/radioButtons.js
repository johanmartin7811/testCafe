

import { Selector} from 'testcafe';

class radioButtons {
    constructor() {
        this.all = Selector('input[type="radio"]'),
            this.windows = Selector('[data-testid="windows-radio"]'),
            this.macOs = Selector('[data-testid="macos-radio"]'),
            this.linux = Selector('[data-testid="linux-radio"]')
    };  
}

export default new radioButtons();
