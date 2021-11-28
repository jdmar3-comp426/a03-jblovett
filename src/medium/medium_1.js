import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    array.forEach(element => {
        sum = sum + element;
    });
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    // first, sort in ascending order
    array.sort();
    let median = 0;
    let length = array.length;
    if (length % 2 == 0) {
        // even case
        let index_1 = length / 2;
        let index_2 = index_1 - 1;
        median = (array[index_1] + array[index_2]) / 2;
    } else {
        let index = Math.ceil(length / 2);
        median = array[index];
    }
    return median;
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let lengthy = array.length;
    let sumy = getSum(array);
    let mediany = getMedian(array);

    // mean = sum / length
    let meany = sumy / lengthy;
    let miny = Math.min(...array);
    let maxy = Math.max(...array);
    let vari = variance(array, meany);
    let stan_dev = Math.sqrt(vari);

    return {
        length: lengthy,
        sum: sumy,
        mean: meany,
        median: mediany,
        min: miny,
        max: maxy,
        variance: vari,
        standard_deviation: stan_dev
    }
}

