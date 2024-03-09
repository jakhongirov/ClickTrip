const model = require('./model')

module.exports = {
   GET: async (req, res) => {
      try {
         const { lang } = req.query

         if (lang) {
            const getCategoriesByLang = await model.getCategoriesByLang(lang)

            if (getCategoriesByLang?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getCategoriesByLang
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }
         } else {
            const getCategories = await model.getCategories()

            if (getCategories?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getCategories
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

   ADD_CATEGORY: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const { category_name, lang } = req.body
         const imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
         const imageName = `${uploadPhoto?.filename}`

         const addCategory = await model.addCategory(
            category_name,
            lang,
            imageUrl,
            imageName
         )

         if (addCategory) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addCategory
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

   UPDATE_CATEGORY: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const { id, category_name, lang } = req.body
         const foundCategory = await model.foundCategory(id)
         let imageUrl = ''
         let imageName = ''

         if (foundCategory) {
            if (uploadPhoto) {
               if (foundCategory?.category_image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundCategory?.category_image_name}`))
                  deleteOldAvatar.delete()
               }

               imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
               imageName = `${uploadPhoto?.filename}`
            } else {
               imageUrl = foundCategory?.category_image_url
               imageName = foundCategory?.category_image_name
            }

            const updateCategory = await model.updateCategory(
               id,
               category_name,
               lang,
               imageUrl,
               imageName
            )

            if (updateCategory) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateCategory
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

   DELETE_CATEGORY: async (req, res) => {
      try {
         const { id } = req.body
         const foundCategory = await model.foundCategory(id)

         if (foundCategory) {
            if (foundCategory?.category_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundCategory?.category_image_name}`))
               deleteOldAvatar.delete()
            }

            const deleteCategory = await model.deleteCategory(id)

            if (deleteCategory) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteCategory
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