import page from '../pages/mainPage';
import checkBoxes from '../pages/checkBoxes';
import * as helpers from '../helpers';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};

fixture('Comment area').beforeEach(setupBeforeEach);

test('Comment area and rate slider should be disabled when "I have tried TestCafe" checkbox is unchecked', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(checkBoxes.triedTestCafe.checked).notOk();

  await t.expect(page.commentArea.hasAttribute('disabled')).ok('Comment area should be disabled');
  await t.expect(page.slider.hasClass('ui-slider-disabled')).ok('Slider should have disabled class');
});

test('Comment area should be visible but disabled when checkbox is not checked', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(checkBoxes.triedTestCafe.checked).notOk();

  await t.expect(page.commentArea.visible).ok('Comment area should be visible');
  await t.expect(page.commentArea.hasAttribute('disabled')).ok('Comment area should be disabled');
});

test('Comment area should be active when "I have tried TestCafe" is checked', async t => {
  await t.expect(page.main.visible).ok();
  await t.click(checkBoxes.triedTestCafe);
  await t.expect(checkBoxes.triedTestCafe.checked).ok();

  await t.expect(page.commentArea.visible).ok('Comment area should be visible');
  await t.expect(page.commentArea.hasAttribute('disabled')).notOk('Comment area should be active (not disabled)');
});

test('Comment area should not be visible when hidden', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.hideElement('[data-testid="comments-area"]');
  await t.expect(page.commentArea.visible).notOk('Comment area should not be visible after hiding');
});
