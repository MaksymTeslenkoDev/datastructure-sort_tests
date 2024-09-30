'use strict';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
async function * generateRandomDataSets(amount=100){
    const datasetLengthStep = 100;
    for(let i=1;i<=amount;i++){
        const size = i * datasetLengthStep;
        let dataSet = [];
        while (dataSet.length < size) {
            dataSet.push(getRandomInt(1, 500000));
        }
        yield dataSet;
    }
}

(async()=>{
    
    
})();

