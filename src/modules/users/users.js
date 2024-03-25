require('dotenv').config();
const model = require('./model')
const axios = require('axios');

module.exports = {
   GET: async (req, res) => {
      try {
         const { limit, page } = req.query

         if (limit && page) {
            const getUsers = await model.getUsers(limit, page)

            if (getUsers?.length > 0) {
               return res.status(200).json({
                  status: 200,
                  message: "Success",
                  data: getUsers
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
               message: "Must write limit and page"
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

   ADD_USER: async (req, res) => {
      try {
         const {
            user_name,
            user_phone_number,
            user_location,
            user_os,
            trip_id,
            hotel_id,
            hotel_name,
            hotel_price
         } = req.body

         const addUser = await model.addUser(
            user_name,
            user_phone_number,
            user_location,
            user_os,
            trip_id
         )

         if (addUser) {
            const foundTrip = await model.foundTrip(trip_id)
            const apiUrl = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;
            const message = `
               Name: ${user_name}\nPhone: ${user_phone_number}\nTrip name: ${foundTrip?.trip_name}\nTrip id: ${foundTrip?.trip_id}\nHotel id: ${hotel_id}\nHotel name: ${hotel_name}\nHotel price: ${hotel_price}
            `
            axios.post(apiUrl, {
               chat_id: process.env.CHAT_ID,
               text: message,
            })
               .then(response => {
                  console.log('Message sent successfully:', response.data);
               })
               .catch(error => {
                  console.error('Error sending message:', error);
               });

            return res.status(201).json({
               status: 201,
               message: "Created"
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
   }
}