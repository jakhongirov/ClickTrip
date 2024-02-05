const model = require('./model')

module.exports = {
   GET: async (req, res) => {
      try {
         const { limit, page } = req.query

         if (limit && page) {
            const getNewsLimit = await model.getNewsLimit(limit, page)

            if (getNewsLimit?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getNewsLimit
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }

         } else {
            const getNews = await model.getNews()

            if (getNews?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getNews
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }

         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }

   },

   GET_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundNews = await model.foundNews(id)

            if (foundNews) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: foundNews
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }
         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   },

   ADD_NEWS: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const {
            news_title,
            news_description,
            news_button_text,
            news_link,
            trip_id
         } = req.body
         const imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
         const imageName = uploadPhoto?.filename;

         const addNews = await model.addNews(
            news_title,
            news_description,
            news_button_text,
            news_link,
            trip_id,
            imageUrl,
            imageName
         )

         if (addNews) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addNews
            })
         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   },

   UPDATE_NEWS: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const {
            news_id,
            news_title,
            news_description,
            news_button_text,
            news_link,
            trip_id
         } = req.body
         const foundNews = await model.foundNews(news_id)

         if (foundNews) {
            if (uploadPhoto) {
               if (foundNews?.news_image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundNews?.news_image_name}`))
                  deleteOldAvatar.delete()
               }
               imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
               imageName = uploadPhoto?.filename;
            } else {
               imageUrl = foundNews?.news_image_link
               imageName = foundNews?.news_image_name
            }

            const updateNews = await model.updateNews(
               news_id,
               news_title,
               news_description,
               news_button_text,
               news_link,
               trip_id,
               imageUrl,
               imageName
            )

            if (updateNews) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateNews
               })
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.status(404).json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   },

   DELETE_NEWS: async (req, res) => {
      try {
         const { news_id } = req.body
         const foundNews = await model.foundNews(news_id)

         if (foundNews) {
            if (foundNews?.news_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundNews?.news_image_name}`))
               deleteOldAvatar.delete()
            }

            const deleteNews = await model.deleteNews(news_id)

            if (deleteNews) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteNews
               })
            } else {
               return res.status(400).json({
                  status: 400,
                  message: "Bad request"
               })
            }

         } else {
            return res.status(404).json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   }
}