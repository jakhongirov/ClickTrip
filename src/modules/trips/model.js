const { fetch, fetchALL } = require('../../lib/postgres')

const getTripsListAdmin = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         trips
      ORDER BY
         trip_id
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)}
   `;

   return fetchALL(QUERY)
}
const getTripsList = (
   destination_id,
   category_id,
   price_from,
   price_to,
   country_id,
   city_id,
   start_date,
   end_date,
   trip_day,
   hotels,
   trip_hot
) => {
   const categoryString = category_id?.length > 0 ? category_id?.map(t => t).join(', ') : ""
   const hotelsString = hotels?.length > 0 ? hotels?.map(t => t).join(', ') : ""

   const QUERY = `
      SELECT
         *
      FROM
         trips a
      WHERE
         trip_active = true
         ${destination_id ? `and destination_id = ${destination_id}` : ""}
         ${categoryString ? `and category_id && ARRAY[${categoryString}]` : ""}
         ${price_from ? `and trip_price >= ${trip_price}` : ""}
         ${price_to ? `and trip_price <= ${price_to}` : ""}
         ${country_id ? `and country_id = ${country_id}` : ""}
         ${city_id ? `and city_id = ${city_id}` : ""}
         ${start_date ? `and trip_start_date = ${start_date}` : ""}
         ${end_date ? `and trip_end_date = ${end_date}` : ""}
         ${trip_day ? `and trip_day = ${trip_day}` : ""}
         ${hotelsString ? `and trip_hotels && ARRAY[${hotelsString}]` : ""}
         ${trip_hot ? `and trip_hot = ${trip_hot}` : ""}
      INNER JOIN
         agencies b
      ON
         a.agency_id = b.agency_id
      ORDER BY
         trip_id DESC
   `;

   return fetchALL(
      QUERY,
      destination_id,
      category_id,
      price_from,
      price_to,
      country_id,
      city_id,
      start_date,
      end_date,
      trip_day,
      hotels,
      trip_hot
   )
}
const foundTrip = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         trips a
      INNER JOIN
         destinations b
      ON
         a.destination_id = b.destination_id
      INNER JOIN
         categories c
      ON
         c.category_id = ANY(a.category_id)
      INNER JOIN
         hotels d
      ON
         d.hotel_id = ANY(a.trip_hotels)
      INNER JOIN
         fly_countries e
      ON
         a.country_id = e.country_id
      INNER JOIN
         fly_cities f
      ON
         a.city_id = f.city_id
      INNER JOIN
         agencies g
      ON
         a.agency_id = g.agency_id
      WHERE
         trip_id = $1
   `;

   return fetch(QUERY, id)
}
const addTrip = (
   destination_id,
   category_id,
   trip_name,
   trip_description,
   trip_price,
   trip_sale_price,
   trip_hot,
   trip_hotels,
   trip_start_date,
   trip_end_date,
   country_id,
   city_id,
   trip_day,
   agency_id,
   imagesUrl,
   imagesName,
   videosUrl,
   videosName
) => {
   const QUERY = `
      INSERT INTO 
         trips (
            destination_id,
            category_id,
            trip_name,
            trip_description,
            trip_price,
            trip_sale_price,
            trip_hot,
            trip_hotels,
            trip_start_date,
            trip_end_date,
            country_id,
            city_id,
            trip_day,
            agency_id,
            trip_images_url,
            trip_images_name,
            trip_videos_url,
            trip_videos_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9,
            $10,
            $11,
            $12,
            $13,
            $14,
            $15,
            $16,
            $17,
            $18
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      destination_id,
      category_id,
      trip_name,
      trip_description,
      trip_price,
      trip_sale_price,
      trip_hot,
      trip_hotels,
      trip_start_date,
      trip_end_date,
      country_id,
      city_id,
      trip_day,
      agency_id,
      imagesUrl,
      imagesName,
      videosUrl,
      videosName
   )
}
const updateTrip = (
   trip_id,
   destination_id,
   category_id,
   trip_name,
   trip_description,
   trip_price,
   trip_sale_price,
   trip_hot,
   trip_hotels,
   trip_start_date,
   trip_end_date,
   country_id,
   city_id,
   trip_day,
   agency_id,
   imagesUrl,
   imagesName,
   videosUrl,
   videosName
) => {
   const QUERY = `
      UPDATE
         trips
      SET
         destination_id = $2,
         category_id = $3,
         trip_name = $4,
         trip_description = $5,
         trip_price = $6,
         trip_sale_price = $7,
         trip_hot = $8,
         trip_hotels = $9,
         trip_start_date = $10,
         trip_end_date = $11,
         country_id = $12,
         city_id = $13,
         trip_day = $14,
         agency_id = $15,
         trip_images_url = $16,
         trip_images_name = $17,
         trip_videos_url = $18,
         trip_videos_name = $19
      WHERE
         trip_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      trip_id,
      destination_id,
      category_id,
      trip_name,
      trip_description,
      trip_price,
      trip_sale_price,
      trip_hot,
      trip_hotels,
      trip_start_date,
      trip_end_date,
      country_id,
      city_id,
      trip_day,
      agency_id,
      imagesUrl,
      imagesName,
      videosUrl,
      videosName
   )
}
const deleteTrip = (trip_id) => {
   const QUERY = `
      DELETE FROM
         trips
      WHERE
         trip_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, trip_id)
}

module.exports = {
   getTripsListAdmin,
   getTripsList,
   foundTrip,
   addTrip,
   updateTrip,
   deleteTrip
}