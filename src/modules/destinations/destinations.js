require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (_, res) => {
      try {
         const getDestinations = await model.getDestinations()

         if (getDestinations?.length > 0) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: getDestinations
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

   ADD_DESTINATION: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const {
            destination_name,
            destination_viza_text,
            destination_viza
         } = req.body
         const imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
         const imageName = `${uploadPhoto?.filename}`

         const addDestination = await model.addDestination(
            destination_name,
            destination_viza_text,
            destination_viza,
            imageUrl,
            imageName
         )

         if (addDestination) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addDestination
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

   UPDATE_DESTINATION: async (req, res) => {
      try {
         const uploadPhoto = req.file
         const {
            id,
            destination_name,
            destination_viza_text,
            destination_viza
         } = req.body
         const foundDestination = await model.foundDestination(id)
         let imageUrl = ""
         let imageName = ""

         if (uploadPhoto) {
            if (foundDestination?.destination_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundDestination?.destination_image_name}`))
               deleteOldAvatar.delete()
            }

            imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`
            imageName = `${uploadPhoto?.filename}`
         } else {
            imageUrl = foundDestination?.destination_image_url
            imageName = foundDestination?.destination_image_name
         }

         if (foundDestination) {
            const updateDestination = await model.updateDestination(
               id,
               destination_name,
               destination_viza_text,
               destination_viza,
               imageUrl,
               imageName
            )

            if (updateDestination) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateDestination
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

   DELETE_DESTINATION: async (req, res) => {
      try {
         const { id } = req.body
         const foundDestination = await model.foundDestination(id)

         if (foundDestination) {

            if (foundDestination?.destination_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundDestination?.destination_image_name}`))
               deleteOldAvatar.delete()
            }

            const deleteDestination = await model.deleteDestination(id)

            if (deleteDestination) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteDestination
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