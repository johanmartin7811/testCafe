import page from '../pages/TestCafePage';
import * as settings from '../settings';
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


