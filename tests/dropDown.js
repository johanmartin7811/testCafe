import { ClientFunction } from 'testcafe';
import page from '../pages/TestCafePage';
import * as helpers from '../helpers';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};


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
  const JavaScript = dropdown.find('option').withText('JavaScript API');
  const both = dropdown.find('option').withText('Both');

  await t.expect(page.main.visible).ok();
  await t.expect(dropdown.visible).ok();

  await t.expect(dropdown.find('option:checked').value).eql('Command Line');

  await t.click(dropdown).click(JavaScript)
  .expect(dropdown.find('option:checked').value).eql('JavaScript API');

  await t.expect(dropdown.find('option:checked').value).eql('JavaScript API');

  await t.click(dropdown).click(both)
  .expect(dropdown.find('option:checked').value).eql('Both');
});

test('Shold select new value in dropdown', async t => {
  const dropdown = page.drowdown.all;
  const both = dropdown.find('option').withText('Both');

  await t.expect(page.main.visible).ok();
  await t.expect(dropdown.visible).ok();


  await t.click(dropdown).click(both)
  .expect(dropdown.find('option:checked').value).eql('Both');
});












