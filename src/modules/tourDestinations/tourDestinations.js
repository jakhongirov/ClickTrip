const model = require('./model')

module.exports = {
   GET: async (req, res) => {
      try {
         const { lang } = req.query

         const tourCitiesList = await model.tourCitiesList(lang)

         if (tourCitiesList?.length > 0) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: tourCitiesList
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

   ADD_TOUR_CITY: async (req, res) => {
      try {
         const {
            destination_name,
            country_id,
            destination_lang
         } = req.body

         const addTourCity = await model.addTourCity(
            destination_name,
            country_id,
            destination_lang
         )

         if (addTourCity) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addTourCity
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

   UPDATE_TOUR_CITY: async (req, res) => {
      try {
         const {
            id,
            destination_name,
            country_id,
            destination_lang
         } = req.body

         const updateTourCity = await model.updateTourCity(
            id,
            destination_name,
            country_id,
            destination_lang
         )

         if (updateTourCity) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: updateTourCity
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

   DELETE_TOUR_CITY: async (req, res) => {
      try {
         const { id } = req.body

         const deleteTourCity = await model.deleteTourCity(id)

         if (deleteTourCity) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: deleteTourCity
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
   }
}