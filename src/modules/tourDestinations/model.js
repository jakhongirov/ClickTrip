const { fetch, fetchALL } = require('../../lib/postgres')

const tourCitiesList = (lang) => {
   const QUERY = `
      SELECT
         *
      FROM
         tour_destinations a
      INNER JOIN
         tour_countries b
      ON
         a.country_id = b.country_id
      ${lang ? (
         `
               WHERE
                  destination_lang = '${lang}'
            `
      ) : ""
      }
      ORDER BY
         country_name
   `;

   return fetchALL(QUERY)
}
const addTourCity = (
   destination_name,
   country_id,
   destination_lang
) => {
   const QUERY = `
      INSERT INTO
         tour_destinations (
            destination_name,
            country_id,
            destination_lang
         ) VALUES (
            $1,
            $2,
            $3
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      destination_name,
      country_id,
      destination_lang
   )
}
const updateTourCity = (
   id,
   destination_name,
   country_id,
   destination_lang
) => {
   const QUERY = `
      UPDATE
         tour_destinations
      SET
         destination_name = $2,
         country_id = $3,
         destination_lang = $4
      WHERE
         destination_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      destination_name,
      country_id,
      destination_lang
   )
}
const deleteTourCity = (id) => {
   const QUERY = `
      DELETE FROM
         tour_destinations
      WHERE
         destination_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   tourCitiesList,
   addTourCity,
   updateTourCity,
   deleteTourCity
}