const PerformanceTest = require('./src/performanceTest');
const { SortingPerfomanceTest, RedBlackTreePerformanceTest } = require('./src/performanceTest');
const fs = require('node:fs');

(async()=>{
    // const testSorting = new SortingPerfomanceTest();
    // await testSorting.runSortingTest();
    // const sortingResults = testSorting.getResults();

    // const sizes = Object.keys(sortingResults).map((key) => parseInt(key));
    // const sortingTimes = sizes.map((size) => sortingResults[size].sortTime);

    const testRedBlackTree = new RedBlackTreePerformanceTest();
    await testRedBlackTree.runRedBlackTreeTest();
    const results = testRedBlackTree.getResults();

    const sizes = Object.keys(results).map((size) => parseInt(size));
    const insertTimes = sizes.map((size) => results[size].insertTime);
    const searchTimes = sizes.map((size) => results[size].searchTime);
    const deleteTimes = sizes.map((size) => results[size].deleteTime);
    
    // Save data to CSV
    let csvContent = 'Size,InsertTime,SearchTime,DeleteTime\n';
    // let csvContent = 'Size,SortTime\n';

    sizes.forEach((size, index) => {
      csvContent += `${size},${insertTimes[index]},${searchTimes[index]},${deleteTimes[index]}\n`;
    });

    // sizes.forEach((size, index) => {
    //   csvContent += `${size},${sortingTimes[index]}\n`;
    // });
    
    fs.writeFileSync('performance_results.csv', csvContent);
    console.log('\nData saved to performance_results.csv');
})();
