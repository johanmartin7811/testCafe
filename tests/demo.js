
// import { Selector, ClientFunction } from "testcafe";
// import page from "../pages/TestCafePage";
// import * as helpers from '../helpers';
// import * as settings from '../settings'
// require('dotenv').config();

// const setupBeforeEach = async t => {
//   await t.maximizeWindow();
//   await page.navigateTo();
// };

// fixture('Elements').beforeEach(setupBeforeEach);

// test('Should display disabled comment area', async t => {
//   await t.expect(page.main.visible).ok();
//   await t.expect(page.commentArea.visible && page.commentArea.getAttribute('disabled'))
//   .ok('The comment area is visible and disabled');
// })


// fixture('Checkboxes').beforeEach(setupBeforeEach);


// test('Should expect 6 checkboxes is visible', async t => {
//   await t.expect(page.main.visible).ok();

//   await t.expect(page.checkBoxes.all.count).eql(6, `Expected 6 checkboxes, found ${await page.checkBoxes.all.count}`);
// });

// test('Should expect all checkboxes are not checked', async t => {
//     await t.expect(page.main.visible).ok();
//     await t.expect(page.checkBoxes.all.visible).ok();

//   for (let i = 0; i < page.checkBoxes.all.count; i++) {
//     const checkbox = page.checkBoxes.all.nth(i);
//     await t.expect(checkbox.checked).notOk(`Checkbox at index ${i} is selected.`);
//   }
// });

// test('Should assert amout(2) checked checkboxes', async t => {
//   await t.expect(page.main.visible).ok();

//   await t.click(page.checkBoxes.remoteTesting);
//   await t.click(page.checkBoxes.parallel);

//   const checkedCount = await Selector(page.checkBoxes.all)
//     .filter(node => node.checked).count;

//   await t.expect(checkedCount).eql(2);
// });

// test('Expect no checkboxes to be visible', async t => {
//   await helpers.hideElement('input[type="checkbox"]');

//   const count = await page.checkBoxes.all.count;
//   for (let i = 0; i < count; i++) {
//       await t.expect(page.checkBoxes.all.nth(i).visible).notOk(`All checkboxes ${i} should be hidden`);
//   }
// });

// fixture('Texts').beforeEach(setupBeforeEach);

// test('Should display all headers and label texts on page', async t => {
//   const expectedTexts = {
//     legend: [
//       "Your name:",
//       "Which features are important to you:",
//       "How would you rate TestCafe on a scale from 1 to 10",
//       "Please let us know what you think:",
//       "What is your primary Operating System:",
//       "Which TestCafe interface do you use:"
//     ],
//     label: [
//       "Support for testing on remote devices",
//       "Re-using existing JavaScript code for testing",
//       "Running tests in background and/or in parallel in multiple browsers",
//       "Easy embedding into a Continuous integration system",
//       "Advanced traffic and markup analysis",
//       "I have tried TestCafe",
//       "Windows",
//       "MacOS",
//       "Linux"
//     ]
//   };

//   await t.expect(page.main.visible).ok();

//   const getTexts = ClientFunction((tag) =>
//     Array.from(document.querySelectorAll(tag), el => el.innerText.trim())
//   );

//   const legendTexts = await getTexts('legend');
//   const labelTexts = await getTexts('label');

//   for (const text of expectedTexts.legend)
//     await t.expect(legendTexts).contains(text, `Missing legend text: "${text}"`);

//   for (const text of expectedTexts.label)
//     await t.expect(labelTexts).contains(text, `Missing label text: "${text}"`);
// });

// test('Should populate name when click on pupulate button', async t => {
//   await t.setNativeDialogHandler(() => true);
//   await t.expect(page.main.visible).ok();

//   await t.expect(page.button.populate.visible).ok();
//   await t.expect(page.button.populate.hasClass('disabled')).notOk();
//   await t.click(page.button.populate);

//   await t.expect(page.nameInput.value).eql(settings.populatedName);
// });


// fixture('Submit form').beforeEach(setupBeforeEach);

// test('Expect submit button is disabled', async t => {
//   await t.expect(page.main.visible).ok();
//   await t.expect(page.button.submit.hasAttribute('disabled')).ok();
// });

// test('Should expect thank you text after click on submit button', async t => {
//   await t.expect(page.main.visible).ok();
//   await t.expect(page.nameInput.visible).ok();
//   await t.typeText(page.nameInput, settings.name);

//   await t.expect(page.nameInput.value).eql(settings.name);
//   await t.expect(page.button.submit.hasAttribute('disabled')).notOk();
//   await t.click(page.button.submit);
//   await t.expect(page.thankYou.innerText).eql(`Thank you, ${settings.name}!`);

//     // Extra assertion to check what happens if the name is not 'Johan Martin'
//     if (settings.name !== "Johan Martin") {
//       // If the name is not "Johan Martin", assert that some expected fallback behavior occurs
//       await t.expect(page.thankYou.innerText).notEql('Thank you, Johan Martin!');
//       // You can assert an alternative behavior or fallback message here
//       await t.expect(page.thankYou.innerText).eql(`Thank you, ${settings.name}!`);
//   }
// });


// fixture('Radio buttom').beforeEach(setupBeforeEach);

//   test('Should expect 3 radio button is visible', async t => {
//     await t.expect(page.main.visible).ok();
//     await t.expect(page.radioButtons.all.visible).ok(); 
//     await t.expect(page.radioButtons.all.count).eql(3, `Expected 3 radio button, found ${await page.radioButtons.all.count}`);

//   });

  
// test('Should expect all radiobuttons are not checked', async t => {
//   await t.expect(page.main.visible).ok();
//   await t.expect(page.radioButtons.all.visible).ok();

//   for (let i = 0; i < page.radioButtons.all.count; i++) {
//     const radioButton = page.radioButtons.all.nth(i);
//     await t.expect(radioButton.checked).notOk(`Radio button at index ${i} should not be checked.`)
//   }
// });

// test(`Should assert 1 selected radiobutton`, async t => {
//   await t.expect(page.main.visible).ok();
//   await t.expect(page.radioButtons.all.visible).ok();
//   await t.click(page.radioButtons.linux);

//   const radioButtonCount = await Selector(page.radioButtons.all)
//     .filter(node => node.checked).count;
//   await t.expect(radioButtonCount).eql(1, `Expected 1 radio button selected, found ${radioButtonCount}`);
// });

// test('Expect no radiobuttons to be visible', async t => {
//   await helpers.hideElement('input[type="radio"]');

//   const count = await page.radioButtons.all.count;
//   for (let i = 0; i < count; i++) {
//       await t.expect(page.radioButtons.all.nth(i).visible).notOk(`Radio button ${i} should be hidden`);
//   }
// });

import { Selector, ClientFunction } from 'testcafe';
import page from '../pages/TestCafePage';
import * as helpers from '../helpers';
import * as settings from '../settings';
require('dotenv').config();

const setupBeforeEach = async t => {
  await t.maximizeWindow();
  await page.navigateTo();
};

fixture('Elements').beforeEach(setupBeforeEach);

test('Should display disabled comment area', async t => {
  await t.expect(page.main.visible).ok();
  await t.expect(page.commentArea.visible && page.commentArea.getAttribute('disabled'))
    .ok('The comment area is visible and disabled');
});


fixture('Checkboxes').beforeEach(setupBeforeEach);

test('Should expect 6 checkboxes are visible', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.assertElementsCount(page.checkBoxes.all, 6, 'checkboxes');
});

test('Should expect all checkboxes are not checked', async t => {
  await t.expect(page.main.visible).ok();
  await helpers.assertAllNotChecked(page.checkBoxes.all, 'Checkbox');
});

test('Should assert amount(2) checked checkboxes', async t => {
  await t.expect(page.main.visible).ok();
  await t.click(page.checkBoxes.remoteTesting);
  await t.click(page.checkBoxes.parallel);

  const checkedCount = await helpers.countChecked('input[type="checkbox"]');
  await t.expect(checkedCount).eql(2);
});

test('Expect no checkboxes to be visible', async t => {
  await helpers.hideElement('input[type="checkbox"]');
  await helpers.assertAllHidden(page.checkBoxes.all, 'Checkbox');
});


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

  const getTexts = ClientFunction((tag) =>
    Array.from(document.querySelectorAll(tag), el => el.innerText.trim())
  );

  const legendTexts = await getTexts('legend');
  const labelTexts = await getTexts('label');

  for (const text of expectedTexts.legend)
    await t.expect(legendTexts).contains(text, `Missing legend text: "${text}"`);

  for (const text of expectedTexts.label)
    await t.expect(labelTexts).contains(text, `Missing label text: "${text}"`);
});

test('Should populate name when click on populate button', async t => {
  await t.setNativeDialogHandler(() => true);
  await t.expect(page.main.visible).ok();
  await t.expect(page.button.populate.visible).ok();
  await t.expect(page.button.populate.hasClass('disabled')).notOk();
  await t.click(page.button.populate);
  await t.expect(page.nameInput.value).eql(settings.populatedName);
});


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








