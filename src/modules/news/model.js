const { fetch, fetchALL } = require('../../lib/postgres')

const getNewsLang = (lang) => {
   const QUERY = `
      SELECT
         *
      FROM
         news
      WHERE
         news_lang = $1
      ORDER BY
         news_id DESC
   `;

   return fetchALL(QUERY, lang)
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
   lang,
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
            news_lang,
            news_image_link,
            news_image_name
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
      news_title,
      news_description,
      news_button_text,
      news_link,
      trip_id,
      lang,
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
   lang,
   imageUrl,
   imageName
) => {
   const QUERY = `
      UPDATE
         news
      SET
         news_title = $2,
         news_description = $3,
         news_button_text = $4,
         news_link = $5,
         trip_id = $6,
         news_lang = $7,
         news_image_link = $8,
         news_image_name = $9
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
      lang,
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
   getNewsLang,
   getNews,
   foundNews,
   addNews,
   updateNews,
   deleteNews
}