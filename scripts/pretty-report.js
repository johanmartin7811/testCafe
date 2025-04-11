const fs = require('fs');
const path = './report.json'; // Path to your TestCafe report

const formatDate = (isoStr) =>
  new Date(isoStr).toLocaleString('sv-SE', {
    timeZone: 'Europe/Stockholm',
    hour12: false,
  });

fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.error('❌ Could not read report:', err);
    return;
  }

  const report = JSON.parse(data);

  console.log('\n📄 TestCafe Report');
  console.log('========================');
  console.log(`🕒 Start Time: ${formatDate(report.startTime)}`);
  console.log(`🕒 End Time:   ${formatDate(report.endTime)}`);
  console.log(`✅ Passed:     ${report.passed} / ${report.total}`);
  console.log(`🖥️  Browsers:   ${report.userAgents.join(', ')}`);

  console.log('\n🧪 Test Results:');
  report.fixtures.forEach((fixture) => {
    console.log(`\n📁 ${fixture.name}`);
    fixture.tests.forEach((test) => {
      console.log(`  - ${test.name} (${test.durationMs} ms)`);
    });
  });
});
