const RedBlackTreeTest = require('./src/test_algorithms/datastructure_tests/RedBlackTreeTest');
const path = require('node:path');

(async()=>{
    const appPath = path.join(process.cwd(),"./");

    console.log("app path ", appPath);
    const testRedBlackTree = new RedBlackTreeTest(appPath);
    await testRedBlackTree.perfomTests();
    await testRedBlackTree.prepateResultsFile();
})();
