'use strict';
// performance/PerformanceTest.js
const RedBlackTree = require('./data_structures/redBlackTree');

class PerformanceTest {
  constructor() {
    this.results = {};
    this.valuesToSearchDelete = new Map();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  *generateRandomDataSets(amount = 100) {}

  async runRedBlackTreeTest() {
    let iterations = 100;

    const iterator = this.generateRandomDataSets(iterations);

    for await (const dataSet of iterator) {
      const size = dataSet.getLength();

      const value = this.getRandomInt(1, 500000);
      // Measure insert time
      let insertStart = performance.now();
      dataSet.insert(value);
      let insertEnd = performance.now();
      let insertTime = insertEnd - insertStart;

      const searchDeleteValue = this.valuesToSearchDelete.get(size);
      let searchStart = performance.now();
      dataSet.search(searchDeleteValue);
      let searchEnd = performance.now();
      let searchTime = searchEnd - searchStart;

      let deleteStart = performance.now();
      dataSet.delete(searchDeleteValue);
      let deleteEnd = performance.now();
      let deleteTime = deleteEnd - deleteStart;

      // Store the results
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

      dataSet.clear();
    }
  }

  async runSortingTest() {
    let iterations = 100;

    const iterator = this.generateRandomDataSets(iterations);

    for await (const dataSet of iterator) {
      const size = dataSet.length;

      let sortStart = performance.now();
      dataSet.sort();
      let sortEnd = performance.now();
      let sortTime = sortEnd - sortStart;

      this.results[size] = {
        sortTime,
      };

      console.log(`Size: ${size}, Sort Time: ${sortTime.toFixed(4)} ms`);
      // this.dataSet.clear();
    }
  }

  getResults() {
    return this.results;
  }
}

class SortingPerfomanceTest extends PerformanceTest {
  constructor() {
    super();
  }

  *generateRandomDataSets(amount = 100) {
    const datasetLengthStep = 50000;
    for (let i = 1; i <= amount; i++) {
      const dataset = new Array();
      const size = i * datasetLengthStep;
      while (dataset.length < size) {
        dataset.push(this.getRandomInt(1, 500000));
      }
      yield dataset;
    }
  }
}

class RedBlackTreePerformanceTest extends PerformanceTest {
  constructor() {
    super();
  }

  *generateRandomDataSets(amount = 100) {
    const datasetLengthStep = 500000;
    for (let i = 1; i <= amount; i++) {
      const dataSet = new RedBlackTree();
      const size = i * datasetLengthStep;
      const random = this.getRandomInt(1, 500000);
      dataSet.insert(random);
      this.valuesToSearchDelete.set(size, random);
      while (dataSet.getLength() < size) {
        dataSet.insert(this.getRandomInt(1, 500000));
      }
      yield dataSet;
    }
  }
}

module.exports = {
  RedBlackTreePerformanceTest,
  SortingPerfomanceTest,
};
