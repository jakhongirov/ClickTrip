const { fetch, fetchALL } = require('../../lib/postgres')

const agenciesList = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         agencies
      ORDER BY
         agency_id
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)};
   `;

   return fetchALL(QUERY)
}
const addAgency = (
   name,
   phone_number,
   pass_hash,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO
         agencies (
            agency_name,
            agency_phone_number,
            agency_password,
            agency_image_url,
            agency_image_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      name,
      phone_number,
      pass_hash,
      imageUrl,
      imageName
   )
}
const foundAgency = (phone_number) => {
   const QUERY = `
      SELECT
         *
      FROM
         agencies
      WHERE
         agency_phone_number = $1;
   `;

   return fetch(QUERY, phone_number)
}
const foundAgencyById = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         agencies
      WHERE
         agency_id = $1;
   `;

   return fetch(QUERY, id)
}
const editAgency = (
   id,
   name,
   phone_number,
   password,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         agencies
      SET
         agency_name = $2,
         agency_phone_number = $3,
         agency_password = $4,
         agency_image_url = $5,
         agency_image_name = $6
      WHERE
         agency_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      name,
      phone_number,
      password,
      imageUrl,
      imageName
   )
}
const deleteAgency = (id) => {
   const QUERY = `
      DELETE FROM
         agencies
      WHERE
         agency_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   agenciesList,
   addAgency,
   foundAgency,
   foundAgencyById,
   editAgency,
   deleteAgency
}