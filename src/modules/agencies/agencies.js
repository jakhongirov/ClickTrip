require('dotenv').config();
const model = require('./model')
const JWT = require('../../lib/jwt')
const bcryptjs = require('bcryptjs')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET: async (req, res) => {
      try {
         const { limit, page } = req.query

         if (limit && page) {
            const agenciesList = await model.agenciesList(limit, page)

            if (agenciesList?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: agenciesList
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
               message: "Bad request, send limit and  page"
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

   POST: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            name,
            phone_number,
            password
         } = req.body

         const pass_hash = await bcryptjs.hash(password, 10)
         const imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
         const imageName = uploadPhoto?.filename;

         const addAgency = await model.addAgency(
            name,
            phone_number,
            pass_hash,
            imageUrl,
            imageName
         )

         if (addAgency) {
            return res.status(201).json({
               status: 201,
               message: "Created",
               data: addAgency
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

   LOGIN: async (req, res) => {
      try {
         const {
            phone_number,
            password
         } = req.body
         const foundAgency = await model.foundAgency(phone_number)

         if (foundAgency) {
            const validPass = await bcryptjs.compare(password, foundAgency.agency_password)

            if (validPass) {
               const token = await new JWT({ id: foundAgency?.agency_id }).sign()
               return res.json({
                  status: 200,
                  message: "Success",
                  data: foundAgency,
                  token: token
               })
            } else {
               return res.json({
                  status: 401,
                  message: "Unauthorized"
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

   UPDATE: async (req, res) => {
      try {
         const uploadPhoto = req.file;
         const {
            id,
            name,
            phone_number,
            password
         } = req.body
         const foundAgencyById = await model.foundAgencyById(id)
         let imageUrl = ''
         let imageName = ''

         if (foundAgencyById) {

            if (uploadPhoto) {
               if (foundAgencyById?.agency_image_name) {
                  const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundAgencyById?.agency_image_name}`))
                  deleteOldAvatar.delete()
               }
               imageUrl = `${process.env.BACKEND_URL}/${uploadPhoto?.filename}`;
               imageName = uploadPhoto?.filename;
            } else {
               imageUrl = foundAgencyById?.agency_image_url
               imageName = foundAgencyById?.agency_image_name
            }

            if (password) {
               const pass_hash = await bcryptjs.hash(password, 10)
               const editAgency = await model.editAgency(
                  id,
                  name,
                  phone_number,
                  pass_hash,
                  imageUrl,
                  imageName
               )

               if (editAgency) {
                  return res.status(200).json({
                     status: 200,
                     message: "Success",
                     data: editAgency
                  })
               } else {
                  return res.status(400).json({
                     status: 400,
                     message: "Bad request"
                  })
               }

            } else {
               const editAgency = await model.editAgency(
                  id,
                  name,
                  phone_number,
                  foundAgencyById?.agency_password,
                  imageUrl,
                  imageName
               )

               if (editAgency) {
                  return res.status(200).json({
                     status: 200,
                     message: "Success",
                     data: editAgency
                  })
               } else {
                  return res.status(400).json({
                     status: 400,
                     message: "Bad request"
                  })
               }
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

   DELETE: async (req, res) => {
      try {
         const { id } = req.body
         const foundAgencyById = await model.foundAgencyById(id)

         if (foundAgencyById) {
            if (foundAgencyById?.agency_image_name) {
               const deleteOldAvatar = new FS(path.resolve(__dirname, '..', '..', '..', 'public', 'images', `${foundAgencyById?.agency_image_name}`))
               deleteOldAvatar.delete()
            }

            const deleteAgency = await model.deleteAgency(id)

            if (deleteAgency) {
               return res.status(200).json({
                  status: 200,
                  message: "Success"
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
               message: "Nof found"
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