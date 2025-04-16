

import { Selector} from 'testcafe';

class dropdown {
    constructor() {
        const dropdownSelector = Selector('[data-testid="preferred-interface-select"]');
            this.all = dropdownSelector;
            this.commandline = dropdownSelector.find('option').withAttribute('value', 'Command Line');
            this.javascriptApiOption = dropdownSelector.find('option').withAttribute('value', 'JavaScript API');
            this.both = dropdownSelector.find('option').withAttribute('value', 'both');
    };  
}

export default new dropdown();
