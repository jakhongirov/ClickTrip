require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (_, res) => {
      try {
         const { lang } = req.query

         if (lang) {
            const getCountriesByLang = await model.getCountriesByLang(lang)

            if (getCountriesByLang?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getCountriesByLang
               })

            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }
         } else {
            const getCountries = await model.getCountries()

            if (getCountries?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getCountries
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

   ADD_COUNTRY: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const { country_name, lang } = req.body
         const imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
         const imageName = `${uploadPhoto?.filename}`

         const addCountry = await model.addCountry(
            country_name,
            lang,
            imageUrl,
            imageName
         )

         if (addCountry) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addCountry
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

   UPDATE_COUNTRY: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const { id, country_name, lang } = req.body
         const foundCountry = await model.foundCountry(id)
         let imageUrl = ''
         let imageName = ''

         if (foundCountry) {
            if (uploadPhoto) {
               if (foundCountry?.counrty_image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundCountry?.counrty_image_name}`))
                  deleteOldAvatar.delete()
               }

               imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
               imageName = `${uploadPhoto?.filename}`
            } else {
               imageUrl = foundCountry?.counrty_image_url
               imageName = foundCountry?.counrty_image_name
            }

            const updateCountry = await model.updateCountry(
               id,
               country_name,
               lang,
               imageUrl,
               imageName
            )

            if (updateCountry) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateCountry
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

   DELETE_COUNTRY: async (req, res) => {
      try {
         const { id } = req.body
         const foundCountry = await model.foundCountry(id)

         if (foundCountry) {
            if (foundCountry?.counrty_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundCountry?.counrty_image_name}`))
               deleteOldAvatar.delete()
            }

            const deleteCountry = await model.deleteCountry(id)

            if (deleteCountry) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteCountry
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