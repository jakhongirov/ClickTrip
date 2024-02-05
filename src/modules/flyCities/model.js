const { fetch, fetchALL } = require('../../lib/postgres')

const getCitiesByCountry = (country_id) => {
   const QUERY = `
      SELECT
         a.city_id,
         a.city_name
      FROM
         fly_cities a
      INNER JOIN
         fly_countries b
      ON
         a.country_id = b.country_id
      WHERE
         country_id = $1
      ORDER BY
         city_name;
   `;

   return fetchALL(QUERY, country_id)
}
const getCities = () => {
   const QUERY = `
      SELECT
         *
      FROM
         fly_cities
      ORDER BY
         city_name;
   `;

   return fetchALL(QUERY)
}
const addCity = (city_name, country_id) => {
   const QUERY = `
      INSERT INTO
         fly_cities (
            city_name,
            country_id
         ) VALUES (
            $1,
            $2
         ) RETURNING *;
   `;

   return fetch(QUERY, city_name, country_id)
}
const foundCity = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         fly_cities
      WHERE
         city_id = $1
   `;

   return fetch(QUERY, id)
}
const updateCity = (id, city_name, country_id) => {
   const QUERY = `
      UPDATE
         fly_cities
      SET
         city_name = $2,
         country_id = $3
      WHERE
         city_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, city_name, country_id)
}
const deleteCity = (id) => {
   const QUERY = `
      DELETE FROM
         fly_cities
      WHERE
         city_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   getCitiesByCountry,
   getCities,
   addCity,
   foundCity,
   updateCity,
   deleteCity
}