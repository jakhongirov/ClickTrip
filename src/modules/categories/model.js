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
const getCategoriesByLang = (lang) => {
   const QUERY = `
      SELECT
         *
      FROM
         categories
      WHERE
         category_lang = $1
      ORDER BY
         category_name
   `;

   return fetchALL(QUERY, lang)
}
const addCategory = (
   category_name,
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO 
         categories (
            category_name,
            category_lang,
            category_image_url,
            category_image_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      category_name,
      lang,
      imageUrl,
      imageName
   )
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
const updateCategory = (
   id,
   category_name,
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         categories
      SET
         category_name = $2,
         category_lang = $3
         category_image_url = $4,
         category_image_name = $5
      WHERE
         category_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      id,
      category_name,
      lang,
      imageUrl,
      imageName
   )
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
   getCategoriesByLang,
   addCategory,
   foundCategory,
   updateCategory,
   deleteCategory
}