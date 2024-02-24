const model = require('./model')

module.exports = {
   GET: async (req, res) => {
      try {
         const airwayList = await model.airwayList()

         if (airwayList?.length > 0) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: airwayList
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

   ADD_AIRWAY: async (req, res) => {
      try {
         const { name } = req.body

         const addAirway = await model.addAirway(name)

         if (addAirway) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: addAirway
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

   UPDATE_AIRWAY: async (req, res) => {
      try {
         const { id, name } = req.body

         const updateAirway = await model.updateAirway(id, name)

         if (updateAirway) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: updateAirway
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

   DELETE_AIRWAY: async (req, res) => {
      try {
         const { id } = req.body

         const deleteAirway = await model.deleteAirway(id)

         if (deleteAirway) {
            return res.status(200).json({
               status: 200,
               message: "Success",
               data: deleteAirway
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