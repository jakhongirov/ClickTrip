require('dotenv').config();
const model = require('./model')
const path = require('path')
const FS = require('../../lib/fs/fs')

const addPriceToHotels = (hotels, prices) => {
   return hotels.map(hotel => {
      const priceEntry = prices.find(entry => entry.id == hotel.hotel_id);
      if (priceEntry) {
         return { ...hotel, price: priceEntry?.price };
      } else {
         return hotel;
      }
   });
}

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
            trip_hot,
            lang
         } = req.body
         const { limit, page } = req.query

         const getTripsList = await model.getTripsList(
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
            trip_hot,
            lang,
            limit,
            page
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
               const foundCategories = await model.foundCategories(foundTrip?.category_id)
               const hotels = foundTrip.trip_hotels.map(hotel => hotel.id);
               const foundHotels = await model.foundHotels(hotels)
               const hotelsWithPrice = addPriceToHotels(foundHotels, foundTrip.trip_hotels);
               
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: foundTrip,
                  categories: foundCategories,
                  hotels: hotelsWithPrice
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
            trip_name,
            trip_description,
            trip_price,
            trip_sale_price,
            trip_hot_price,
            trip_hot,
            trip_start_date,
            trip_end_date,
            trip_day,
            lang,
            destination_id,
            category_id,
            trip_hotels,
            country_id,
            city_id,
            airway_id,
            baggage,
            agency_id
         } = req.body
         const imagesUrl = []
         const imagesName = []
         const videosUrl = []
         const videosName = []

         const start_date_parts = trip_start_date.split(".");
         const start_day = parseInt(start_date_parts[0]);
         const start_month = parseInt(start_date_parts[1]) - 1;
         const start_year = parseInt(start_date_parts[2]);
         const start_dateObject = new Date(start_year, start_month, start_day);
         const start_date = start_dateObject.getTime() / 1000;

         const end_date_parts = trip_end_date.split(".");
         const end_day = parseInt(end_date_parts[0]);
         const end_month = parseInt(end_date_parts[1]) - 1;
         const end_year = parseInt(end_date_parts[2]);
         const end_dateObject = new Date(end_year, end_month, end_day);
         const end_date = end_dateObject.getTime() / 1000;

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
            trip_name,
            trip_description,
            trip_price,
            trip_sale_price,
            trip_hot_price,
            trip_hot,
            start_date,
            end_date,
            trip_day,
            lang,
            destination_id,
            JSON.parse(category_id),
            JSON.parse(trip_hotels),
            country_id,
            city_id,
            airway_id,
            baggage,
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
            trip_name,
            trip_description,
            trip_price,
            trip_sale_price,
            trip_hot_price,
            trip_hot,
            trip_start_date,
            trip_end_date,
            trip_day,
            lang,
            destination_id,
            category_id,
            trip_hotels,
            country_id,
            city_id,
            airway_id,
            baggage,
            agency_id
         } = req.body
         const foundTrip = await model.foundTrip(trip_id)
         const imagesUrl = []
         const imagesName = []
         const videosUrl = []
         const videosName = []

         const start_date_parts = trip_start_date.split(".");
         const start_day = parseInt(start_date_parts[0]);
         const start_month = parseInt(start_date_parts[1]) - 1;
         const start_year = parseInt(start_date_parts[2]);
         const start_dateObject = new Date(start_year, start_month, start_day);
         const start_date = start_dateObject.getTime() / 1000;

         const end_date_parts = trip_end_date.split(".");
         const end_day = parseInt(end_date_parts[0]);
         const end_month = parseInt(end_date_parts[1]) - 1;
         const end_year = parseInt(end_date_parts[2]);
         const end_dateObject = new Date(end_year, end_month, end_day);
         const end_date = end_dateObject.getTime() / 1000;

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
               trip_name,
               trip_description,
               trip_price,
               trip_sale_price,
               trip_hot_price,
               trip_hot,
               start_date,
               end_date,
               trip_day,
               lang,
               destination_id,
               JSON.parse(category_id),
               JSON.parse(trip_hotels),
               country_id,
               city_id,
               airway_id,
               baggage,
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