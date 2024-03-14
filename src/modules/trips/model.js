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
   trip_hot,
   lang,
   limit,
   page
) => {
   const categoryString = category_id?.length > 0 ? category_id?.map(t => t).join(', ') : ""
   const hotelsString = hotels?.length > 0 ? hotels?.map(t => t).join(', ') : ""

   const QUERY = `
      SELECT
         *
      FROM
         trips a
      INNER JOIN
         agencies b
      ON
         a.agency_id = b.agency_id
      INNER JOIN
         tour_destinations c
      ON
         a.destination_id = c.destination_id
      INNER JOIN
         fly_cities d
      ON
         a.city_id = d.city_id
      WHERE
         trip_active = true
         ${destination_id ? `and destination_id = ${destination_id}` : ""}
         ${categoryString ? `and category_id && ARRAY[${categoryString}]::bigint[]` : ""}
         ${price_from ? `and trip_price >= ${trip_price}` : ""}
         ${price_to ? `and trip_price <= ${price_to}` : ""}
         ${country_id ? `and country_id = ${country_id}` : ""}
         ${city_id ? `and city_id = ${city_id}` : ""}
         ${start_date ? `and trip_start_date = ${start_date}` : ""}
         ${end_date ? `and trip_end_date = ${end_date}` : ""}
         ${trip_day ? `and trip_day = ${trip_day}` : ""}
         ${hotelsString ? `and trip_hotels && ARRAY[${hotelsString}]::bigint[]` : ""}
         ${trip_hot ? `and trip_hot = ${trip_hot}` : ""}
         ${lang ? `and trip_lang = '${lang}'` : ""}
      ORDER BY
         trip_id DESC
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)}
   `;

   return fetchALL(QUERY)
}
const foundTrip = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         trips a
      INNER JOIN
         tour_destinations b
      ON
         a.destination_id = b.destination_id
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
      INNER JOIN
         airways c
      ON
         a.airway_id = c.airway_id
      WHERE
         trip_id = $1
   `;

   return fetch(QUERY, id)
}
const foundHotels = (trip_hotels) => {
   const QUERY = `
      SELECT
         *
      FROM
         hotels
      WHERE
         hotel_id::int = ANY($1);
   `;

   return fetchALL(QUERY, trip_hotels)
}
const foundCategories = (category_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         categories
      WHERE
         category_id::int = ANY($1);
   `;

   return fetchALL(QUERY, category_id)
}
const addTrip = (
   trip_name,
   trip_description,
   trip_price,
   trip_sale_price,
   trip_hot_price,
   trip_hot,
   start_date,
   end_date,
   trip_day,
   lang,
   destination_id,
   category_id,
   trip_hotels,
   country_id,
   city_id,
   airway_id,
   baggage,
   agency_id,
   imagesUrl,
   imagesName,
   videosUrl,
   videosName
) => {
   const QUERY = `
      INSERT INTO 
         trips (
            trip_name,
            trip_description,
            trip_price,
            trip_sale_price,
            trip_hot_price,
            trip_hot,
            trip_start_date,
            trip_end_date,
            trip_day,
            trip_lang,
            destination_id,
            category_id,
            trip_hotels,
            country_id,
            city_id,
            airway_id,
            baggage,
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
            $18,
            $19,
            $20,
            $21,
            $22
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      trip_name,
      trip_description,
      trip_price,
      trip_sale_price,
      trip_hot_price,
      trip_hot,
      start_date,
      end_date,
      trip_day,
      lang,
      destination_id,
      category_id,
      trip_hotels,
      country_id,
      city_id,
      airway_id,
      baggage,
      agency_id,
      imagesUrl,
      imagesName,
      videosUrl,
      videosName
   )
}
const updateTrip = (
   trip_id,
   trip_name,
   trip_description,
   trip_price,
   trip_sale_price,
   trip_hot_price,
   trip_hot,
   start_date,
   end_date,
   trip_day,
   lang,
   destination_id,
   category_id,
   trip_hotels,
   country_id,
   city_id,
   airway_id,
   baggage,
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
         trip_name = $2,
         trip_description = $3,
         trip_price = $4,
         trip_sale_price = $5,
         trip_hot_price = $6,
         trip_hot = $7,
         trip_start_date = $8,
         trip_end_date = $9,
         trip_day = $10,
         trip_lang = $11,
         destination_id = $12,
         category_id = $13,
         trip_hotels = $14,
         country_id = $15,
         city_id = $16,
         airway_id = $17,
         baggage = $18,
         agency_id = $19,
         trip_images_url = $20,
         trip_images_name = $21,
         trip_videos_url = $22,
         trip_videos_name = $23
      WHERE
         trip_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      trip_id,
      trip_name,
      trip_description,
      trip_price,
      trip_sale_price,
      trip_hot_price,
      trip_hot,
      start_date,
      end_date,
      trip_day,
      lang,
      destination_id,
      category_id,
      trip_hotels,
      country_id,
      city_id,
      airway_id,
      baggage,
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
   foundHotels,
   foundCategories,
   addTrip,
   updateTrip,
   deleteTrip
}