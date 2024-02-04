require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

module.exports = {
   GET_ADMIN: async (req, res) => {
      try {
         const { limit, page } = req.query

         if (limit && page) {
            const getTripsListAdmin = await model.getTripsListAdmin(limit, page)

            if (getTripsListAdmin?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getTripsListAdmin
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Nod found"
               })
            }

         } else {
            return res.status(400).json({
               status: 400,
               message: "Bad request, send limit and page"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   GET: async (req, res) => {
      try {
         const {
            destination_id,
            category_id,
            price_from,
            price_to,
            country_id,
            city_id,
            start_date,
            end_date,
            trip_day,
            hotels,
            trip_hot
         } = req.body

         const getTripsList = await model.getTripsList(
            destination_id,
            JSON.parse(category_id),
            price_from,
            price_to,
            country_id,
            city_id,
            start_date,
            end_date,
            trip_day,
            JSON.parse(hotels),
            trip_hot
         )

         if (getTripsList?.length > 0) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: getTripsList
            })
         } else {
            return res.status(404).json({
               status: 404,
               message: "Nod found"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   GET_ID: async (req, res) => {
      try {
         const { id } = req.params

         if (id) {
            const foundTrip = await model.foundTrip(id)

            if (foundTrip) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: foundTrip
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Nod found"
               })
            }

         } else {
            return res.status(404).json({
               status: 400,
               message: "Bad request, send trip id"
            })
         }

      } catch (error) {
         console.log(error)
         return res.status(500).json({
            status: 500,
            message: "Interval Server Error"
         })
      }
   },

   ADD_TRIP: async (req, res) => {
      try {
         const uploadFile = req.files
         const {
            destination_id,
            category_id,
            trip_name,
            trip_description,
            trip_price,
            trip_sale_price,
            trip_hot,
            trip_hotels,
            trip_start_date,
            trip_end_date,
            country_id,
            city_id,
            trip_day,
            agency_id
         } = req.body
         const imagesUrl = []
         const imagesName = []
         const videosUrl = []
         const videosName = []

         if (uploadFile?.photos?.length > 0) {
            uploadFile?.photos?.forEach((e) => {
               imagesUrl.push(
                  `${process.env.BACKEND_URL}/${e?.filename}`,
               );
               imagesName.push(e.filename);
            });
         }

         if (uploadFile?.videos?.length > 0) {
            uploadFile?.videos?.forEach((e) => {
               videosUrl.push(
                  `${process.env.BACKEND_URL}/${e?.filename}`,
               );
               videosName.push(e.filename);
            });
         }

         const addTrip = await model.addTrip(
            destination_id,
            JSON.parse(category_id),
            trip_name,
            trip_description,
            trip_price,
            trip_sale_price,
            trip_hot,
            JSON.parse(trip_hotels),
            trip_start_date,
            trip_end_date,
            country_id,
            city_id,
            trip_day,
            agency_id,
            imagesUrl,
            imagesName,
            videosUrl,
            videosName
         )

         if (addTrip) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addTrip
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
            message: "Interval Server Error"
         })
      }
   },

   UPDATE_TRIP: async (req, res) => {
      try {
         const uploadFile = req.files
         const {
            trip_id,
            destination_id,
            category_id,
            trip_name,
            trip_description,
            trip_price,
            trip_sale_price,
            trip_hot,
            trip_hotels,
            trip_start_date,
            trip_end_date,
            country_id,
            city_id,
            trip_day,
            agency_id
         } = req.body
         const foundTrip = await model.foundTrip(trip_id)
         const imagesUrl = []
         const imagesName = []
         const videosUrl = []
         const videosName = []

         if (foundTrip) {

            if (uploadFile?.photos?.length > 0) {
               foundTrip?.trip_images_name.forEach((e) => {
                  new FS(
                     path.resolve(
                        __dirname,
                        '..',
                        '..',
                        '..',
                        'public',
                        'images',
                        `${e}`,
                     ),
                  ).delete();
               });

               uploadFile?.photos?.forEach((e) => {
                  imagesUrl.push(
                     `${process.env.BACKEND_URL}/${e.filename}`,
                  );
                  imagesName.push(e.filename);
               });
            } else {
               foundTrip?.trip_images_url.forEach((e) => {
                  imagesUrl.push(e);
               });
               foundTrip?.trip_images_name.forEach((e) => {
                  imagesName.push(e);
               });
            }

            if (uploadFile?.videos?.length > 0) {
               foundTrip?.trip_videos_name.forEach((e) => {
                  new FS(
                     path.resolve(
                        __dirname,
                        '..',
                        '..',
                        '..',
                        'public',
                        'images',
                        `${e}`,
                     ),
                  ).delete();
               });

               uploadFile?.videos?.forEach((e) => {
                  videosUrl.push(
                     `${process.env.BACKEND_URL}/${e.filename}`,
                  );
                  videosName.push(e.filename);
               });
            } else {
               foundTrip?.trip_videos_url.forEach((e) => {
                  videosUrl.push(e);
               });
               foundTrip?.trip_videos_name.forEach((e) => {
                  videosName.push(e);
               });
            }

            const updateTrip = await model.updateTrip(
               trip_id,
               destination_id,
               JSON.parse(category_id),
               trip_name,
               trip_description,
               trip_price,
               trip_sale_price,
               trip_hot,
               JSON.parse(trip_hotels),
               trip_start_date,
               trip_end_date,
               country_id,
               city_id,
               trip_day,
               agency_id,
               imagesUrl,
               imagesName,
               videosUrl,
               videosName
            )

            if (updateTrip) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateTrip
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
            message: "Interval Server Error"
         })
      }
   },

   DELETE_TRIP: async (req, res) => {
      try {
         const { trip_id } = req.body
         const foundTrip = await model.foundTrip(trip_id)

         if (foundTrip) {
            if (foundTrip?.trip_images_name?.length > 0) {
               foundTrip?.trip_images_name.forEach((e) => {
                  new FS(
                     path.resolve(
                        __dirname,
                        '..',
                        '..',
                        '..',
                        'public',
                        'images',
                        `${e}`,
                     ),
                  ).delete();
               });
            }

            if (foundTrip?.trip_videos_name?.length > 0) {
               foundTrip?.trip_videos_name.forEach((e) => {
                  new FS(
                     path.resolve(
                        __dirname,
                        '..',
                        '..',
                        '..',
                        'public',
                        'images',
                        `${e}`,
                     ),
                  ).delete();
               });
            }

            const deleteTrip = await model.deleteTrip(trip_id)

            if (deleteTrip) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteTrip
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
            message: "Interval Server Error"
         })
      }
   }
}