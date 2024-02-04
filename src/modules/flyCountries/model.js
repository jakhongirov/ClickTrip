const { fetch, fetchALL } = require('../../lib/postgres')

const getCountries = () => {
   const QUERY = `
      SELECT
         *
      FROM
         fly_countries
      ORDER BY
         country_name
   `;

   return fetchALL(QUERY)
}
const addCountry = (
   country_name,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO
         fly_countries (
            country_name,
            counrty_image_url,
            counrty_image_name
         ) VALUES (
            $1,
            $2,
            $3
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      country_name,
      imageUrl,
      imageName
   )
}
const foundCountry = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         fly_countries
      WHERE
         country_id = $1
   `;

   return fetch(QUERY, id)
}
const updateCountry = (
   id,
   country_name,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         fly_countries
      SET
         country_name = $2,
         counrty_image_url = $3,
         counrty_image_name = $4
      WHERE
         country_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      country_name,
      imageUrl,
      imageName
   )
}
const deleteCountry = (id) => {
   const QUERY = `
      DELETE FROM
         fly_countries
      WHERE
         country_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   getCountries,
   addCountry,
   foundCountry,
   updateCountry,
   deleteCountry
}