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
const getCountriesByLang = (lang) => {
   const QUERY = `
      SELECT
         a.country_id,
         country_name,
         counrty_image_url,
         counrty_image_name,
         json_agg(json_build_object('id', b.city_id, 'name', b.city_name)) AS cities
      FROM
         fly_countries a
      INNER JOIN
         fly_cities b
      ON
         a.country_id = b.country_id
      WHERE
         counrty_lang = $1
      GROUP BY
         a.country_id
      ORDER BY
         country_name;
   `;

   return fetchALL(QUERY, lang)
}
const addCountry = (
   country_name,
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO
         fly_countries (
            country_name,
            counrty_lang,
            counrty_image_url,
            counrty_image_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      country_name,
      lang,
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
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         fly_countries
      SET
         country_name = $2,
         counrty_lang = $3
         counrty_image_url = $4,
         counrty_image_name = $5
      WHERE
         country_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      country_name,
      lang,
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
   getCountriesByLang,
   addCountry,
   foundCountry,
   updateCountry,
   deleteCountry
}