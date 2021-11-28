import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

let avg_city = 0;
(mpg_data.forEach(current => (avg_city = avg_city + current.city_mpg)));

let avg_highway = 0;
(mpg_data.forEach(current => (avg_highway = avg_highway + current.highway_mpg)));


function groupBy(objectArray) {
    return objectArray.reduce(function (acc, obj, index) {
      let found = false;
      
      if (!acc[0]) {
        acc[index] = {make: obj.make, hybrids: [obj.id]};
        return acc;
        
      } else {
        acc.forEach(val => {
          if (val.make === obj.make) {
            val.hybrids.push(obj.id);
            found = true;
          }
        });
      }
      if (!found) {
        acc.push({make: obj.make, hybrids: [obj.id]});
      }
      return acc;
    }, [])
}

let hybs = groupBy(mpg_data.filter(val => val.hybrid));


function groupByProp(objectArray, property) {
    return objectArray.reduce(function (acc, obj, index) {
      let key = obj[property]
      if (!acc[key]) {
        let hybridFiltered = objectArray.filter(val => val.year === key && val.hybrid);
        let avg_highway_hybrid = 0;
        let avg_city_hybrid = 0;
        hybridFiltered.forEach(current => {
            avg_highway_hybrid = avg_highway_hybrid + current.highway_mpg;
            avg_city_hybrid = avg_city_hybrid + current.city_mpg;
        });
        
         
        let avg_highway_not_hybrid = 0;
        let avg_city_not_hybrid = 0;
        
        let notHybridFiltered = objectArray.filter(val => val.year === key && !val.hybrid);
        notHybridFiltered.forEach(current => {
            avg_highway_not_hybrid = avg_highway_not_hybrid + current.highway_mpg;

            avg_city_not_hybrid = avg_city_not_hybrid + current.city_mpg;   
        });
        acc[key] = {hybrid: {city: avg_city_hybrid, highway: avg_highway_hybrid}, notHybrid: {city: avg_city_not_hybrid, highway: avg_highway_not_hybrid}};
      }
      
      
      return acc
    }, {})
}

let avgs = groupByProp(mpg_data, 'year');
/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {city: avg_city / mpg_data.length, highway: avg_highway / mpg_data.length},
    allYearStats: getStatistics(mpg_data.map(value => value.year)),
    ratioHybrids: mpg_data.filter(value => value.hybrid).length / mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 * 
 * first, filter by hybrids > 0
 * make already alphabetized
 * while make hasn't changed, add to array
 * else, new array
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */


export const moreStats = {
    makerHybrids: hybs,
    avgMpgByYearAndHybrid: avgs
};
