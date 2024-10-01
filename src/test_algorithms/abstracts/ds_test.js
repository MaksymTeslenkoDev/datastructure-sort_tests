'use strict';
const fs = require('node:fs');
const { getRandomInt } = require('../../../utils/datasetGenerator');
const { pipeline, Writable } = require('node:stream');
const path = require('node:path');
/**
 * Data structure test class
 * @class DataStructureTest
 * @property {string} name - The name of the data structure
 * @property {Array} columns - The columns of the data structure
 * @property {DataStructure} ds - The data structure to test
 */
class DataStructureTest {
  constructor(appPath) {
    this.name = '';
    this.ds = null;
    this.results = {};
    this.dataSetLengthIncrement = 200000;
    this.amount = 100;
    this.directoryPath = '';
  }

  *generateDataSets() {}

  async perfomTests() {
    const iterator = this.generateDataSets();
    for await (const { dataSet, valueToSearchDelete } of iterator) {
      const size = dataSet.getLength();

      const value = getRandomInt(1, 500000);
      let insertStart = performance.now();
      dataSet.insert(value);
      let insertEnd = performance.now();
      let insertTime = insertEnd - insertStart;

      let searchStart = performance.now();
      dataSet.search(valueToSearchDelete);
      let searchEnd = performance.now();
      let searchTime = searchEnd - searchStart;

      let deleteStart = performance.now();
      dataSet.delete(valueToSearchDelete);
      let deleteEnd = performance.now();
      let deleteTime = deleteEnd - deleteStart;

      this.results[size] = {
        insertTime,
        searchTime,
        deleteTime,
      };

      console.log(
        `Size: ${size}, Insert Time: ${insertTime.toFixed(
          4,
        )} ms, Search Time: ${searchTime.toFixed(
          4,
        )} ms, Delete Time: ${deleteTime.toFixed(4)} ms`,
      );
    }
  }

  async prepateResultsFile() {
    const results = this.results;
    let csvContent = 'Size,InsertTime,SearchTime,DeleteTime\n';
    for (const size in results) {
      const parsedSize = parseInt(size);
      csvContent += `${parsedSize},${results[parsedSize].insertTime},${results[parsedSize].searchTime},${results[parsedSize].deleteTime}\n`;
    }
    fs.writeFileSync(`${this.name}_performance_results.csv`, csvContent);
    console.log(`\nData saved to ${this.name}_performance_results.csv`);
  }

  async writesDataSetsToFiles() {
    const iterator = this.generateDataSets();
    await pipeline(
      iterator,
      fs.createWriteStream(`${this.directoryPath}/data.json`, {
        objectMode: true,
      }),
      (err) => {
        if (err) {
          console.error('Failed to write data sets to file');
          console.error(err);
        } else {
          console.log(`\nData sets saved to ${this.name}_data_sets.json`);
        }
      },
    );
  }
}

module.exports = DataStructureTest;
