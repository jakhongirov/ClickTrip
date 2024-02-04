const { fetch, fetchALL } = require('../../lib/postgres')

const getCategories = () => {
   const QUERY = `
      SELECT
         *
      FROM
         categories
      ORDER BY
         category_name
   `;

   return fetchALL(QUERY)
}
const addCategory = (category_name) => {
   const QUERY = `
      INSERT INTO 
         categories (
            category_name
         ) VALUES (
            $1
         ) RETURNING *;
   `;

   return fetch(QUERY, category_name)
}
const foundCategory = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         categories
      WHERE
         category_id = $1
   `;

   return fetch(QUERY, id)
}
const updateCategory = (id, category_name) => {
   const QUERY = `
      UPDATE
         categories
      SET
         category_name = $2
      WHERE
         category_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id, category_name)
}
const deleteCategory = (id) => {
   const QUERY = `
      DELETE FROM
         categories
      WHERE
         category_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, id)
}

module.exports = {
   getCategories,
   addCategory,
   foundCategory,
   updateCategory,
   deleteCategory
}