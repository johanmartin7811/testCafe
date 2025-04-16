import page from '../pages/TestCafePage';
import * as helpers from '../helpers';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};

fixture('Comment area').beforeEach(setupBeforeEach);

test.meta({ type: 'critical', jira: 'JIRA-123' }) ('Should display disabled comment area', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.commentArea.visible && page.commentArea.getAttribute('disabled'))
    .ok('The comment area is visible and disabled');
});

test('Expect comment area is not visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.hideElement('[data-testid="comments-area"]')
  await t.expect(page.commentArea.visible).notOk();
});






