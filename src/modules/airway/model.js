const { fetch, fetchALL } = require('../../lib/postgres')

const airwayList = () => {
   const QUERY = `
      SELECT
         *
      FROM
         airways
      ORDER BY
         airway_name;
   `;

   return fetchALL(QUERY)
}
const addAirway = (name) => {
   const QUERY = `
      INSERT INTO
         airways (
            airway_name
         ) VALUES (
            $1
         ) RETURNING *;
   `;

   return fetch(QUERY, name)
}
const updateAirway = (id, name) => {
   const QUERY = `
      UPDATE
         airways
      SET
         airway_name = $2
      WHERE
         airway_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, name)
}
const deleteAirway = (id) => {
   const QUERY = `
      DELETE FROM
         airways
      WHERE
         airway_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   airwayList,
   addAirway,
   updateAirway,
   deleteAirway
}