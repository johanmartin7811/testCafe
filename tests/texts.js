import { ClientFunction } from 'testcafe';
import page from '../pages/mainPage';
import * as settings from '../settings';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};


fixture('Texts').beforeEach(setupBeforeEach);

test('Should display all headers and label texts on page', async t => {
  const expectedTexts = {
    legend: [
      "Your name:",
      "Which features are important to you:",
      "How would you rate TestCafe on a scale from 1 to 10",
      "Please let us know what you think:",
      "What is your primary Operating System:",
      "Which TestCafe interface do you use:"
    ],
    label: [
      "Support for testing on remote devices",
      "Re-using existing JavaScript code for testing",
      "Running tests in background and/or in parallel in multiple browsers",
      "Easy embedding into a Continuous integration system",
      "Advanced traffic and markup analysis",
      "I have tried TestCafe",
      "Windows",
      "MacOS",
      "Linux"
    ]
  };

  await t.expect(page.main.visible).ok();
  await t.expect(page.legends.count).gt(0, 'No legend elements found on the page');  
  await t.expect(page.labels.count).gt(0, 'No label elements found on the page');    

  const getTexts = ClientFunction((tag) => {
    const elements = Array.from(document.querySelectorAll(tag), el => el.innerText.trim());
    if (!elements.length) {
      throw new Error(`No elements found for tag: ${tag}`); 
    }
    return elements;
  });

  
  const textSelectors = { 
    'legend': expectedTexts.legend,
    'label': expectedTexts.label,
  };

  for (const [tag, expectedTextsArray] of Object.entries(textSelectors)) {
    const texts = await getTexts(tag);
    for (const expectedText of expectedTextsArray) {
      await t.expect(texts).contains(expectedText, `Missing ${tag} text: "${expectedText}"`);
    }
  }
});


test('Should populate name when click on populate button', async t => {
  await t.setNativeDialogHandler(() => true);
  await t.expect(page.main.visible).ok();
  await t.expect(page.button.populate.visible).ok();
  await t.expect(page.button.populate.hasClass('disabled')).notOk();
  await t.click(page.button.populate);
  await t.expect(page.nameInput.value).eql(settings.populatedName);
});















