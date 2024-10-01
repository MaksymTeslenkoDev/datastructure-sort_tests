'use strict';

const DataStructureTest = require("../abstracts/ds_test");
const RedBlackTree = require("../../data_structures/redBlackTree");
const {generateDataSets} = require('../../../utils/datasetGenerator');
const path = require("node:path");

class RedBlackTreeTest extends DataStructureTest {
  constructor(appPath) {
    super(appPath);
    this.name = "Red Black Tree";
    this.ds = RedBlackTree;
    this.amount = 100;
    this.dataSetLengthIncrement = 250000;
    this.directoryPath = path.join(appPath,'data','RedBlackTree');
  }

  generateDataSets(){
    return generateDataSets({amount:this.amount, increment: this.dataSetLengthIncrement, ds: this.ds})
  }
}

module.exports = RedBlackTreeTest;