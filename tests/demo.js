import { ClientFunction } from 'testcafe';
import page from '../pages/TestCafePage';
import * as helpers from '../helpers';
import * as settings from '../settings';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};

fixture('Elements').beforeEach(setupBeforeEach);

test('Should display disabled comment area', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.commentArea.visible && page.commentArea.getAttribute('disabled'))
    .ok('The comment area is visible and disabled');
});

fixture('Confirm dialog').beforeEach(setupBeforeEach);

test('Should display confirmation dialog if name is pre-filled and Populate is clicked', async t => {
  await t.setNativeDialogHandler(() => true);
  await t.expect(page.main.visible).ok();
  await t.click(page.button.populate);
  await t.expect(page.nameInput.value).eql(settings.populatedName);
  await t.click(page.button.populate);

  const history = await t.getNativeDialogHistory();

  const confirmDialog = history.find(dialog =>
    dialog.type === 'confirm' &&
    dialog.text === 'Reset information before proceeding?'
  );

  await t.expect(confirmDialog).ok('confirm');
  await t.expect(confirmDialog).ok('Expected confirm dialog to be visible');
  await t.expect(confirmDialog.text).notEql('Confirm');
});

test('Expect no text is visible when deleting text', async t => {
  await t.setNativeDialogHandler(() => true);
  await t.expect(page.main.visible).ok();
  await t.click(page.button.populate);
  await t.expect(page.nameInput.value).eql(settings.populatedName);
  await t.selectText(page.nameInput).pressKey('delete');

  await t.expect(page.nameInput.innerText).eql('');    
});


fixture('Checkboxes').beforeEach(setupBeforeEach);

test('Should expect 6 checkboxes are visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.assertElementsCount(page.checkBoxes.all, 6, 'checkboxes');
});

test('Should expect all checkboxes are not checked', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.assertAllNotChecked(page.checkBoxes.all, 'Checkbox');
});

test('Should assert two checked checkboxes', async t => {
  await t.expect(page.main.visible).ok();
  await t.click(page.checkBoxes.remoteTesting);
  await t.click(page.checkBoxes.parallel);

  const checkedCount = await helpers.countChecked('input[type="checkbox"]');
  await t.expect(checkedCount).eql(2);
});

test('Expect no checkboxes to be visible', async t => {
  await helpers.hideElement('input[type="checkbox"]');
  await helpers.assertAllHidden(page.checkBoxes.all, 'Checkbox');
});


fixture('Texts').beforeEach(setupBeforeEach);

test('Should display all headers and label texts on page', async t => {
  const expectedTexts = {
    legend: [
      "Your name:",
      "Which features are important to you:",
      "How would you rate TestCafe on a scale from 1 to 10",
      "Please let us know what you think:",
      "What is your primary Operating System:",
      "Which TestCafe interface do you use:"
    ],
    label: [
      "Support for testing on remote devices",
      "Re-using existing JavaScript code for testing",
      "Running tests in background and/or in parallel in multiple browsers",
      "Easy embedding into a Continuous integration system",
      "Advanced traffic and markup analysis",
      "I have tried TestCafe",
      "Windows",
      "MacOS",
      "Linux"
    ]
  };

  await t.expect(page.main.visible).ok();

  const getTexts = ClientFunction((tag) =>
    Array.from(document.querySelectorAll(tag), el => el.innerText.trim())
  );

  const legendTexts = await getTexts('legend');
  const labelTexts = await getTexts('label');

  for (const text of expectedTexts.legend)
    await t.expect(legendTexts).contains(text, `Missing legend text: "${text}"`);

  for (const text of expectedTexts.label)
    await t.expect(labelTexts).contains(text, `Missing label text: "${text}"`);
});

test('Should populate name when click on populate button', async t => {
  await t.setNativeDialogHandler(() => true);
  await t.expect(page.main.visible).ok();
  await t.expect(page.button.populate.visible).ok();
  await t.expect(page.button.populate.hasClass('disabled')).notOk();
  await t.click(page.button.populate);
  await t.expect(page.nameInput.value).eql(settings.populatedName);
});


fixture('Submit form').beforeEach(setupBeforeEach);

test('Expect submit button is disabled', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.button.submit.hasAttribute('disabled')).ok();
});

test('Should expect thank you text after click on submit button', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.nameInput.visible).ok();
  await t.typeText(page.nameInput, settings.name);
  await t.expect(page.nameInput.value).eql(settings.name);
  await t.expect(page.button.submit.hasAttribute('disabled')).notOk();
  await t.click(page.button.submit);
  await t.expect(page.thankYou.innerText).eql(`Thank you, ${settings.name}!`);

  if (settings.name !== "Johan Martin") {
    await t.expect(page.thankYou.innerText).notEql('Thank you, Johan Martin!');
    await t.expect(page.thankYou.innerText).eql(`Thank you, ${settings.name}!`);
  }
});


fixture('Radio button').beforeEach(setupBeforeEach);

test('Should expect 3 radio buttons are visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.assertElementsCount(page.radioButtons.all, 3, 'radio buttons');
});

test('Should expect all radio buttons are not checked', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.assertAllNotChecked(page.radioButtons.all, 'Radio button');
});

test('Should assert 1 selected radio button', async t => {
  await t.expect(page.main.visible).ok();
  await t.click(page.radioButtons.linux);
  const selectedCount = await helpers.countChecked('input[type="radio"]');
  await t.expect(selectedCount).eql(1);
});

test('Expect no radio buttons to be visible', async t => {
  await helpers.hideElement('input[type="radio"]');
  await helpers.assertAllHidden(page.radioButtons.all, 'Radio button');
});

fixture('Dropdown').beforeEach(setupBeforeEach);

test('Expect dropdown is visible', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.drowdown.all.visible).ok();
});


test('should expect three options in the dropdown', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.drowdown.all.visible).ok();
  await helpers.assertDropdownOptionCount('[data-testid="preferred-interface-select"]', 3, 'Preferred Interface Select');
});

test('Expect all options is visible', async t => {
  const label = ['Command Line', 'JavaScript API', 'Both'];
  await t.expect(page.main.visible).ok();
  await t.expect(page.drowdown.all.visible).ok();
  await t.click(page.drowdown.all);

  const getTexts = ClientFunction((tag) =>
    Array.from(document.querySelectorAll(tag), el => el.innerText.trim())
  );

  const option = await getTexts('option');

  for (const text of label)
    await t.expect(option).contains(text, `Missing legend text: "${text}"`);
});

test('Expect dropdown is not visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.hideElement('[data-testid="preferred-interface-select"]');
  await helpers.assertAllHidden(page.drowdown.all, 'option');
});

test('Shold select new value in dropdown', async t => {
  const dropdown = page.drowdown.all;
  const option = dropdown.find('option').withText('JavaScript API');

  await t.expect(page.main.visible).ok();
  await t.expect(dropdown.visible).ok();

  await t.expect(dropdown.find('option:checked').value).eql('Command Line');

  await t.click(dropdown).click(option)
  .expect(dropdown.find('option:checked').value).eql('JavaScript API');
});












