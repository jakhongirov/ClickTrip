const { fetch, fetchALL } = require('../../lib/postgres')

const getTourCountries = () => {
   const QUERY = `
      SELECT
         *
      FROM
         tour_countries
      ORDER BY
         country_name
   `;

   return fetchALL(QUERY)
}
const getTourCountriesLang = (lang) => {
   const QUERY = `
      SELECT
         *
      FROM
         tour_countries
      WHERE
         country_lang = $1
      ORDER BY
         country_name
   `;

   return fetchALL(QUERY, lang)
}
const addTourCountries = (
   country_name,
   country_viza_text,
   country_viza,
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO 
         tour_countries (
            country_name,
            country_viza_text,
            country_viza,
            country_lang,
            country_image_url,
            country_image_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      country_name,
      country_viza_text,
      country_viza,
      lang,
      imageUrl,
      imageName
   )
}
const foundTourCountries = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         tour_countries
      WHERE
         country_id = $1
   `;

   return fetch(QUERY, id)
}
const updateTourCountries = (
   id,
   country_name,
   country_viza_text,
   country_viza,
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         tour_countries
      SET
         country_name = $2,
         country_viza_text = $3,
         country_viza = $4,
         country_lang = $5
         country_image_url = $6,
         country_image_name = $7
      WHERE
         country_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      country_name,
      country_viza_text,
      country_viza,
      lang,
      imageUrl,
      imageName
   )
}
const deleteTourCountries = (id) => {
   const QUERY = `
      DELETE FROM
         tour_countries
      WHERE
         country_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   getTourCountries,
   getTourCountriesLang,
   addTourCountries,
   foundTourCountries,
   updateTourCountries,
   deleteTourCountries
}