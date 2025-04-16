import page from '../pages/mainPage';
import * as settings from '../settings';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};

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


