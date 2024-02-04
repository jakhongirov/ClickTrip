const model = require('./model')

module.exports = {
   GET: async (req, res) => {
      try {
         const { country_id } = req.query

         if (country_id) {
            const getCitiesByCountry = await model.getCitiesByCountry(country_id)

            if (getCitiesByCountry?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getCitiesByCountry
               })
            } else {
               return res.status(404).json({
                  status: 404,
                  message: "Not found"
               })
            }

         } else {
            const getCities = await model.getCities()

            if (getCities?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getCities
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

   ADD_CITY: async (req, res) => {
      try {
         const {
            city_name,
            country_id
         } = req.body

         const addCity = await model.addCity(city_name, country_id)

         if (addCity) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addCity
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

   UPDATE_CITY: async (req, res) => {
      try {
         const {
            id,
            city_name,
            country_id
         } = req.body
         const foundCity = await model.foundCity(id)

         if (foundCity) {
            const updateCity = await model.updateCity(id, city_name, country_id)

            if (updateCity) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: updateCity
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

   DEETE_CITY: async (req, res) => {
      try {
         const { id } = req.body
         const foundCity = await model.foundCity(id)

         if (foundCity) {
            const deleteCity = await model.deleteCity(id)

            if (deleteCity) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: deleteCity
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