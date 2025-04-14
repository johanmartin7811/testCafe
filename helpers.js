import { Selector, ClientFunction, t } from 'testcafe';

export const hideElement = ClientFunction((selector) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => el.style.display = 'none');
});

export const countChecked = ClientFunction((selector) => {
    return Array.from(document.querySelectorAll(selector))
        .filter(el => el.checked).length;
});

export async function assertAllNotChecked(selectorCollection, label) {
    const count = await selectorCollection.count;
    for (let i = 0; i < count; i++) {
        await t.expect(selectorCollection.nth(i).checked)
            .notOk(`${label} at index ${i} should not be checked.`);
    }
}

export async function assertAllHidden(selectorCollection, label) {
    const count = await selectorCollection.count;
    for (let i = 0; i < count; i++) {
        await t.expect(selectorCollection.nth(i).visible)
            .notOk(`${label} ${i} should be hidden`);
    }
}

export async function assertElementsCount(selectorCollection, expectedCount, label) {
    const actualCount = await selectorCollection.count;
    await t.expect(actualCount).eql(expectedCount, `Expected ${expectedCount} ${label}, but found ${actualCount}`);
}

export async function assertDropdownOptionCount(dropdownSelector, expectedCount, label) {
    // Find the dropdown and options inside it
    const dropdown = Selector(dropdownSelector); // Use the dropdown selector
    const options = dropdown.find('option'); // Find all 'option' elements inside the dropdown
  
    // Count the number of options
    const optionCount = await options.count;

    // Assert that the number of options matches the expected count
    await t.expect(optionCount).eql(expectedCount, `Expected ${expectedCount} options in the dropdown ${label}, but found ${optionCount}`);
}