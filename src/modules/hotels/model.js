const { fetch, fetchALL } = require('../../lib/postgres')

const getHotelsListAdminLimit = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         hotels
      ORDER BY
         hotel_star DESC
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)}
   `;

   return fetchALL(QUERY)
}
const getHotelsListAdmin = () => {
   const QUERY = `
      SELECT
         *
      FROM
         hotels
      ORDER BY
         hotel_star DESC
   `;

   return fetchALL(QUERY)
}
const getHotelList = (
   meal,
   star,
   destination_id
) => {
   const QUERY = `
      SELECT
         *
      FROM
         hotels
      WHERE
         hotel_active = true
         ${meal ? `and hotel_meal = '${meal}'` : ""}
         ${star ? `and hotel_star >= ${star}` : ""}
         ${destination_id ? `and destination_id = ${destination_id}` : ""}
      ORDER BY
         hotel_star
   `;

   return fetchALL(
      QUERY,
      meal,
      star,
      destination_id
   )
}
const addHotel = (
   hotel_name,
   hotel_price,
   hotel_description,
   hotel_meal,
   hotel_star,
   destination_id,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO
         hotels (
            hotel_name,
            hotel_price,
            hotel_description,
            hotel_meal,
            hotel_star,
            destination_id,
            hotel_image_url,
            hotel_image_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      hotel_name,
      hotel_price,
      hotel_description,
      hotel_meal,
      hotel_star,
      destination_id,
      imageUrl,
      imageName
   )
}
const foundHotel = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         hotels
      WHERE
         hotel_id = $1
   `;

   return fetch(QUERY, id)
}
const updateHotel = (
   id,
   hotel_name,
   hotel_price,
   hotel_description,
   hotel_meal,
   hotel_star,
   destination_id,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         hotels
      SET
         hotel_name = $2,
         hotel_price = $3,
         hotel_description = $4,
         hotel_meal = $5,
         hotel_star = $6,
         destination_id = $7,
         hotel_image_url = $8,
         hotel_image_name = $9
      WHERE
         hotel_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      hotel_name,
      hotel_price,
      hotel_description,
      hotel_meal,
      hotel_star,
      destination_id,
      imageUrl,
      imageName
   )
}
const deleteHotel = (id) => {
   const QUERY = `
      DELETE FROM
         hotels
      WHERE
         hotel_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   getHotelsListAdminLimit,
   getHotelsListAdmin,
   getHotelList,
   addHotel,
   foundHotel,
   updateHotel,
   deleteHotel
}