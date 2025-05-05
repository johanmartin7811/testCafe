import page from '../pages/mainPage';
import * as settings from '../settings';
import * as helpers from '../helpers'
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};


fixture('Submit form').beforeEach(setupBeforeEach);

test('Expect submit button is disabled', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.button.submit.hasAttribute('disabled')).ok();
});

test('Expect the submit button to be enabled when a name is entered in the input field.', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.nameInput.visible).ok();
  await helpers.enterNameAndCheckSubmitButton(t, settings.name, page);
});

test('Expect the submit button to be enabled when name is populated in the input field.', async t => {
  await t.setNativeDialogHandler(() => true);
  await t.expect(page.main.visible).ok();
  await t.expect(page.nameInput.visible).ok();
  await t.click(page.button.populate);
  await t.expect(page.nameInput.value).eql(settings.populatedName);
  await t.expect(page.button.submit.hasAttribute('disabled')).notOk();
});

test('Should navigate to the correct URL after form submission', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.nameInput.visible).ok();
  await helpers.enterNameAndCheckSubmitButton(t, settings.name, page);
  await t.click(page.button.submit);
  await t.expect(t.eval(() => window.location.href)).contains('thank-you');
});

test('Should expect thank you text after click on submit button', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.nameInput.visible).ok();
  await helpers.enterNameAndCheckSubmitButton(t, settings.name, page);
  await t.click(page.button.submit);
  await t.expect(page.thankYou.innerText).eql(`Thank you, ${settings.name}!`);

  if (settings.name !== "Johan Martin") {
    await t.expect(page.thankYou.innerText).notEql('Thank you, Johan Martin!');
    await t.expect(page.thankYou.innerText).eql(`Thank you, ${settings.name}!`);
  }
});

test('Submit button should not be visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.hideElement('[data-testid="submit-button"]');
  await helpers.assertAllHidden(page.button.submit, 'submit');
});