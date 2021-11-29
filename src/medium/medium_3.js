import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    // filter car_data by params
    // reverse sort
    return car_data
        .filter(val => val.horsepower >= minHorsepower && val.torque >= minTorque)
        .sort((a, b) => {
            let a_horse = a.horsepower;
            let b_horse = b.horsepower;
            if (a_horse == b_horse) {
                return 0;
            }
            return a_horse < b_horse ? 1 : -1;  
        });
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    let avg_city = 0;
    car_data.forEach(current => (avg_city = avg_city + current.city_mpg));

    let avg_highway = 0;
    car_data.forEach(current => (avg_highway = avg_highway + current.highway_mpg));
    return car_data
        .filter(val => val.highway_mpg >= minHighway && val.city_mpg >= minCity)
        .sort((a, b) => {
            let a_high = a.highway_mpg;
            let b_high= b.highway_mpg;
            if (a_high == b_high) {
                return 0;
            }
            return a_high < b_high ? 1 : -1;  
        });
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    let lower_case = searchTerm.toLowerCase();
    let placement_array = []
    return car_data
        .filter(val => {
            let current_id = val.id.toLowerCase();
            let res = current_id.indexOf(lower_case);
            if (res > -1) {
                placement_array.push(res);
            }
            return res > -1;
        })
        .map((val, index) => {
            return {car: val, rank: placement_array[index]}
        })
        .sort((a, b) => {
            if (a.rank == b.rank) {
                return 0;
            }
            return a.rank < b.rank ? -1 : 1;  
        })
        .map(val => val.car);
}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    return car_data
        .filter(val => val.horsepower >= minHorsepower && val.torque >= minTorque)
        .sort((a, b) => {
            let a_horse = a.horsepower;
            let b_horse = b.horsepower;
            if (a_horse == b_horse) {
                return 0;
            }
            return a_horse < b_horse ? 1 : -1;  
        });

}
