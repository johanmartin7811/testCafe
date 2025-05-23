import { ClientFunction } from 'testcafe';
import page from '../pages/mainPage';
import dropdown from '../pages/dropdown';
import * as helpers from '../helpers';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};

fixture('Dropdown').beforeEach(setupBeforeEach);

test('Expect dropdown is visible', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(dropdown.all.visible).ok();
});


test('should expect three options in the dropdown', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(dropdown.all.visible).ok();
  await helpers.assertDropdownOptionCount('[data-testid="preferred-interface-select"]', 3, 'Preferred Interface Select');
});

test('Expect all options are visible', async t => {
  const label = ['Command Line', 'JavaScript API', 'Both'];
  await t.expect(page.main.visible).ok();
  await t.expect(dropdown.all.visible).ok();
  await t.click(dropdown.all);

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
  await helpers.assertAllHidden(dropdown.all, 'option');
});

test('Should select new value in dropdown', async t => {
  const dropDown = dropdown.all;
  const JavaScript = dropDown.find('option').withText('JavaScript API');
  const both = dropDown.find('option').withText('Both');

  await t.expect(page.main.visible).ok();
  await t.expect(dropDown.visible).ok();

  await t.expect(dropDown.find('option:checked').value).eql('Command Line');

  await t.click(dropDown).click(JavaScript)
  .expect(dropDown.find('option:checked').value).eql('JavaScript API');
  await t.expect(dropDown.find('option:checked').value).eql('JavaScript API');

  await t.click(dropDown).click(both)
  .expect(dropDown.find('option:checked').value).eql('Both');
});













