const { fetch, fetchALL } = require('../../lib/postgres')

const getDestinations = () => {
   const QUERY = `
      SELECT
         *
      FROM
         destinations
      ORDER BY
         destination_name
   `;

   return fetchALL(QUERY)
}
const addDestination = (
   destination_name,
   destination_viza_text,
   destination_viza,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO 
         destinations (
            destination_name,
            destination_viza_text,
            destination_viza,
            destination_image_url,
            destination_image_name
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
      destination_name,
      destination_viza_text,
      destination_viza,
      imageUrl,
      imageName
   )
}
const foundDestination = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         destinations
      WHERE
         destination_id = $1
   `;

   return fetch(QUERY, id)
}
const updateDestination = (
   id,
   destination_name,
   destination_viza_text,
   destination_viza,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         destinations
      SET
         destination_name = $2,
         destination_viza_text = $3,
         destination_viza = $4,
         destination_image_url = $5,
         destination_image_name = $6
      WHERE
         destination_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      destination_name,
      destination_viza_text,
      destination_viza,
      imageUrl,
      imageName
   )
}
const deleteDestination = (id) => {
   const QUERY = `
      DELETE FROM
         destinations
      WHERE
         destination_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   getDestinations,
   addDestination,
   foundDestination,
   updateDestination,
   deleteDestination
}