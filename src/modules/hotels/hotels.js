require('dotenv').config();
const model = require('./model')
const JWT = require('../../lib/jwt')
const bcryptjs = require('bcryptjs')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, page } = req.query

         if (limit && page) {
            const getHotelsListAdminLimit = await model.getHotelsListAdminLimit(limit, page)

            if (getHotelsListAdminLimit?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getHotelsListAdminLimit
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found",
               })
            }

         } else {
            const getHotelsListAdmin = await model.getHotelsListAdmin()

            if (getHotelsListAdmin?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getHotelsListAdmin
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found",
               })
            }
         }

      } catch (error) {
         console.log(error)
         res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   },


   GET: async (req, res) => {
      try {
         const { star, country, city, lang } = req.body

         const getHotelList = await model.getHotelList(
            star,
            country,
            city,
            lang
         )

         if (getHotelList?.length > 0) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: getHotelList
            })
         } else {
            return res.status(404).json({
               status: 404,
               message: "Not found"
            })
         }

      } catch (error) {
         console.log(error)
         res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   },

   ADD_HOTEL: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const {
            hotel_name,
            hotel_description,
            hotel_star,
            hotel_location,
            hotel_country,
            hotel_city,
            lang
         } = req.body
         const imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
         const imageName = `${uploadPhoto?.filename}`

         const addHotel = await model.addHotel(
            hotel_name,
            hotel_description,
            hotel_star,
            hotel_location,
            hotel_country,
            hotel_city,
            lang,
            imageUrl,
            imageName
         )

         if (addHotel) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addHotel
            })
         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request"
            })
         }

      } catch (error) {
         console.log(error)
         res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   },

   UPDATE_HOTEL: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const {
            id,
            hotel_name,
            hotel_description,
            hotel_star,
            hotel_location,
            hotel_country,
            hotel_city,
            lang
         } = req.body
         const foundHotel = await model.foundHotel(id)
         let imageUrl = ``
         let imageName = ``

         if (foundHotel) {
            if (uploadPhoto) {
               if (foundHotel?.hotel_image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundHotel?.hotel_image_name}`))
                  deleteOldAvatar.delete()
               }
               imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
               imageName = uploadPhoto?.filename;
            } else {
               imageUrl = foundHotel?.hotel_image_url
               imageName = foundHotel?.hotel_image_name
            }

            const updateHotel = await model.updateHotel(
               id,
               hotel_name,
               hotel_description,
               hotel_star,
               hotel_location,
               hotel_country,
               hotel_city,
               lang,
               imageUrl,
               imageName
            )

            if (updateHotel) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateHotel
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
         res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   },

   DELETE_HOTEL: async (req, res) => {
      try {
         const { id } = req.body
         const foundHotel = await model.foundHotel(id)

         if (foundHotel) {
            if (foundHotel?.hotel_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundHotel?.hotel_image_name}`))
               deleteOldAvatar.delete()
            }

            const deleteHotel = await model.deleteHotel(id)

            if (deleteHotel) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteHotel
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
         res.status(500).json({
            status: 500,
            message: "Internal Server Error"
         })
      }
   }
}