const { fetchALL, fetch } = require('../../lib/postgres')

const getUsers = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         users
      ORDER BY
         user_id
      LIMIT ${limit}
      OFFSET ${Number((page - 1) * limit)}
   `;

   return fetchALL(QUERY)
}
const foundTrip = (trip_id) => {
   const QUERY = `
      SELECT
         *
      FROM
         trips
      WHERE
         trip_id = $1
   `;

   return fetch(QUERY, trip_id)
}
const addUser = (
   user_name,
   user_phone_number,
   user_location,
   user_os,
   trip_id
) => {
   const QUERY = `
      INSERT INTO
         users (
            user_name,
            user_phone_number,
            user_location,
            user_os,
            user_trip
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
      user_name,
      user_phone_number,
      user_location,
      user_os,
      trip_id
   )
}

module.exports = {
   getUsers,
   foundTrip,
   addUser
}