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
const addUser = (
   user_name,
   user_phone_number,
   user_location,
   user_os
) => {
   const QUERY = `
      INSERT INTO
         users (
            user_name,
            user_phone_number,
            user_location,
            user_os
         ) VALUES (
            $1,
            $2,
            $3,
            $4
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      user_name,
      user_phone_number,
      user_location,
      user_os
   )
}

module.exports = {
   getUsers,
   addUser
}