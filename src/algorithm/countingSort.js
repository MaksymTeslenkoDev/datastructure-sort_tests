'use strict';

function countingSort(arr) {
  if (!arr.length) return arr;

  let min = arr[0];
  let max = arr[0];

  for (let num of arr) {
    if (num < min) min = num;
    else if (num > max) max = num;
  }

  // Initialize the count array
  let countArrayLength = max - min + 1;
  let countArray = new Array(countArrayLength).fill(0);

  // Fill the count array
  for (let num of arr) {
    countArray[num - min]++;
  }

  // Modify the count array to store cumulative counts
  for (let i = 1; i < countArray.length; i++) {
    countArray[i] += countArray[i - 1];
  }

  // Build the output array
  let output = new Array(arr.length);
  for (let i = arr.length - 1; i >= 0; i--) {
    let num = arr[i];
    let index = countArray[num - min] - 1;
    output[index] = num;
    countArray[num - min]--;
  }

  return output;
}

module.exports = countingSort;