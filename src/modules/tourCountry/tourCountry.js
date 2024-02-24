require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (_, res) => {
      try {
         const { lang } = req.query

         if (lang) {
            const getTourCountriesLang = await model.getTourCountriesLang(lang)

            if (getTourCountriesLang?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getTourCountriesLang
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }
         } else {
            const getTourCountries = await model.getTourCountries()

            if (getTourCountries?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getTourCountries
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

   ADD_TOUR_COUNTRY: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const {
            country_name,
            country_viza_text,
            country_viza,
            lang
         } = req.body
         const imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
         const imageName = `${uploadPhoto?.filename}`

         const addTourCountries = await model.addTourCountries(
            country_name,
            country_viza_text,
            country_viza,
            lang,
            imageUrl,
            imageName
         )

         if (addTourCountries) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addTourCountries
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

   UPDATE_TOUR_COUNTRY: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const {
            id,
            country_name,
            country_viza_text,
            country_viza,
            lang
         } = req.body
         const foundTourCountries = await model.foundTourCountries(id)
         let imageUrl = ""
         let imageName = ""

         if (uploadPhoto) {
            if (foundTourCountries?.country_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundTourCountries?.country_image_name}`))
               deleteOldAvatar.delete()
            }

            imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
            imageName = `${uploadPhoto?.filename}`
         } else {
            imageUrl = foundTourCountries?.country_image_url
            imageName = foundTourCountries?.country_image_name
         }

         if (foundTourCountries) {
            const updateTourCountries = await model.updateTourCountries(
               id,
               country_name,
               country_viza_text,
               country_viza,
               lang,
               imageUrl,
               imageName
            )

            if (updateTourCountries) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateTourCountries
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

   DELETE_TOUR_COUNTRY: async (req, res) => {
      try {
         const { id } = req.body
         const foundTourCountries = await model.foundTourCountries(id)

         if (foundTourCountries) {

            if (foundTourCountries?.country_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundTourCountries?.country_image_name}`))
               deleteOldAvatar.delete()
            }

            const deleteTourCountries = await model.deleteTourCountries(id)

            if (deleteTourCountries) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteTourCountries
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