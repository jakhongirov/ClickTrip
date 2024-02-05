const { fetch, fetchALL } = require('../../lib/postgres')

const getNewsLimit = (limit, page) => {
   const QUERY = `
      SELECT
         *
      FROM
         news
      ORDER BY
         news_id DESC
      LIMIT ${limit},
      OFFSET ${Number((page - 1) * limit)}
   `;

   return fetchALL(QUERY)
}
const getNews = () => {
   const QUERY = `
      SELECT
         *
      FROM
         news
      ORDER BY
         news_id DESC
   `;

   return fetchALL(QUERY)
}
const foundNews = (id) => {
   const QUERY = `
      SELECT
         *
      FROM
         news
      WHERE
         news_id = $1;
   `;

   return fetch(QUERY, id)
}
const addNews = (
   news_title,
   news_description,
   news_button_text,
   news_link,
   trip_id,
   imageUrl,
   imageName
) => {
   const QUERY = `
      INSERT INTO 
         news (
            news_title,
            news_description,
            news_button_text,
            news_link,
            trip_id,
            news_image_link,
            news_image_name
         ) VALUES (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
         ) RETURNING *;
   `;

   return fetch(
      QUERY,
      news_title,
      news_description,
      news_button_text,
      news_link,
      trip_id,
      imageUrl,
      imageName
   )
}
const updateNews = (
   news_id,
   news_title,
   news_description,
   news_button_text,
   news_link,
   trip_id,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         news
      SET
         news_title,
         news_description,
         news_button_text,
         news_link,
         trip_id,
         news_image_link,
         news_image_name
      WHERE
         news_id = $1
      RETURNING *;
   `;

   return fetch(
      QUERY,
      news_id,
      news_title,
      news_description,
      news_button_text,
      news_link,
      trip_id,
      imageUrl,
      imageName
   )
}
const deleteNews = (news_id) => {
   const QUERY = `
      DELETE FROM
         news
      WHERE
         news_id = $1
      RETURNING *;
   `;

   return fetch(QUERY, news_id)
}

module.exports = {
   getNewsLimit,
   getNews,
   foundNews,
   addNews,
   updateNews,
   deleteNews
}