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
   star,
   country,
   city,
   lang
) => {
   const QUERY = `
      SELECT
         *
      FROM
         hotels
      WHERE
         hotel_active = true
         ${star ? `and hotel_star >= ${star}` : ""}
         ${lang ? `and hotel_lang = '${lang}'` : ""}
         ${country ? `and hotel_country = ${country}` : ""}
         ${city ? `and hotel_country = ${city}` : ""}
      ORDER BY
         hotel_star
   `;

   return fetchALL(QUERY)
}
const addHotel = (
   hotel_name,
   hotel_description,
   hotel_star,
   hotel_location,
   hotel_country,
   hotel_city,
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO
         hotels (
            hotel_name,
            hotel_description,
            hotel_star,
            hotel_location,
            hotel_country,
            hotel_city,
            hotel_lang,
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
            $8,
            $9
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      hotel_name,
      hotel_description,
      hotel_star,
      hotel_location,
      hotel_country,
      hotel_city,
      lang,
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
   hotel_description,
   hotel_star,
   hotel_location,
   hotel_country,
   hotel_city,
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         hotels
      SET
         hotel_name = $2,
         hotel_description = $3,
         hotel_star = $4,
         hotel_location = $5,
         hotel_country = $6,
         hotel_city = $7,
         hotel_lang = $8,
         hotel_image_url = $9,
         hotel_image_name = $10
      WHERE
         hotel_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      hotel_name,
      hotel_description,
      hotel_star,
      hotel_location,
      hotel_country,
      hotel_city,
      lang,
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