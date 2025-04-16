import page from '../pages/TestCafePage';
import * as helpers from '../helpers';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};


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







