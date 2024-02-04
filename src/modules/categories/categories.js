const model = require('./model')

module.exports = {
   GET: async (_, res) => {
      try {
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
         const { category_name } = req.bod

         const addCategory = await model.addCategory(category_name)

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
         const { id, category_name } = req.body
         const foundCategory = await model.foundCategory(id)

         if (foundCategory) {
            const updateCategory = await model.updateCategory(id, category_name)

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