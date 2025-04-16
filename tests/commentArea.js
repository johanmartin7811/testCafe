import page from '../pages/mainPage';
import checkBoxes from '../pages/checkBoxes';
import * as helpers from '../helpers';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};

fixture('Comment area').beforeEach(setupBeforeEach);

test('Should disable comment area unless I have tried TestCafe is checked', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(checkBoxes.triedTestCafe.checked).notOk();
  await t.expect(page.commentArea.visible && page.commentArea.getAttribute('disabled'))
    .ok('The comment area is visible and disabled');
});

test('Should activate comment area when I have tried TestCafe is checked', async t => {
  await t.expect(page.main.visible).ok();
  await t.click(checkBoxes.triedTestCafe);
  await t.expect(checkBoxes.triedTestCafe.checked).ok();
  await t.expect(page.commentArea.visible && page.commentArea.getAttribute('disabled'))
    .notOk('The comment area is visible and active');
});

test('Expect comment area is not visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.hideElement('[data-testid="comments-area"]')
  await t.expect(page.commentArea.visible).notOk();
});






