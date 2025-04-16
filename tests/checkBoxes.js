import page from '../pages/mainPage';
import checkBoxes from '../pages/checkBoxes';
import * as helpers from '../helpers';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};

fixture('Checkboxes').beforeEach(setupBeforeEach);

test('Should expect 6 checkboxes are visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.assertElementsCount(checkBoxes.all, 6, 'checkboxes');
});

test
('Should expect all checkboxes are not checked', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.assertAllNotChecked(checkBoxes.all, 'Checkbox');
});


test('Should assert two checked checkboxes', async t => {
  await t.expect(page.main.visible).ok();
  await t.click(checkBoxes.remoteTesting);
  await t.click(checkBoxes.parallel);

  const checkedCount = await helpers.countChecked('input[type="checkbox"]');
  await t.expect(checkedCount).eql(2);
});

test('Expect no checkboxes to be visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.hideElement('input[type="checkbox"]');
  await helpers.assertAllHidden(checkBoxes.all, 'Checkbox');
});















