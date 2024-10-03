'use strcit';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 *
 * @param {number} amount
 * @param {number} increment
 * @param {DataStructure} ds
 */
function* generateDataSets({ amount, increment, ds }) {
  const dataSet = new ds();
  for (let i = 1; i <= amount; i++) {
    const size = i * increment;
    const random = getRandomInt(1, 500000);
    dataSet.insert(random);
    const startTime = performance.now();
    while (dataSet.getLength() < size) {
      dataSet.insert(getRandomInt(1, 500000));
    }
    const endTime = performance.now();
    let generateTime = endTime - startTime;
    console.log(`Size: ${size}, Generate Time: ${generateTime.toFixed(4)}`);
    yield { dataSet, valueToSearchDelete: random, generateTime };
  }
  dataSet.clear();
}

module.exports = { generateDataSets, getRandomInt };
