const express = require("express")
const router = express.Router()

//Middlawares
const { AUTH } = require('../middleware/auth')
const FileUpload = require('../middleware/multer')

// files
const admin = require('./admin/admin')
const users = require('./users/users')
const agencies = require('./agencies/agencies')
const categories = require('./categories/categories')
const tourCountry = require('./tourCountry/tourCountry')
const tourDestinations = require('./tourDestinations/tourDestinations')
const flyCountries = require('./flyCountries/flyCountries')
const flyCities = require('./flyCities/flyCities')
const airway = require('./airway/airway')
const hotels = require('./hotels/hotels')
const trips = require('./trips/trips')
const news = require('./news/news')

router

   // ADMIN API
   .get('/admin/list', AUTH, admin.GET_ADMIN)
   .post('/admin/register', admin.REGISTER_ADMIN)
   .post('/admin/login', admin.LOGIN_ADMIN)
   .put('/admin/edit', AUTH, admin.EDIT_ADMIN)
   .delete('/admin/delete', AUTH, admin.DELETE_ADMIN)

   // USERS API
   .get('/users/list', AUTH, users.GET)
   .post('/user/add', users.ADD_USER)

   // AGENCIES API
   .get('/agencies/list', AUTH, agencies.GET)
   .post('/agency/add', AUTH, FileUpload.single("photo"), agencies.POST)
   .post('/agency/login', agencies.LOGIN)
   .put('/agency/edit', AUTH, FileUpload.single("photo"), agencies.UPDATE)
   .delete('/agency/delete', AUTH, agencies.DELETE)

   // CATEGORIES API
   .get('/categories', categories.GET)
   .post('/category/add', AUTH, FileUpload.single("photo"), categories.ADD_CATEGORY)
   .put('/category/edit', AUTH, FileUpload.single("photo"), categories.UPDATE_CATEGORY)
   .delete('/category/delete', AUTH, categories.DELETE_CATEGORY)

   // TOUR COUNTRY API
   .get('/tour/countries', tourCountry.GET)
   .post('/tour/country/add', AUTH, FileUpload.single("photo"), tourCountry.ADD_TOUR_COUNTRY)
   .put('/tour/country/edit', AUTH, FileUpload.single("photo"), tourCountry.UPDATE_TOUR_COUNTRY)
   .delete('/tour/country/delete', AUTH, tourCountry.DELETE_TOUR_COUNTRY)

   // TOUR DESTINATION API
   .get('/tour/destinations', tourDestinations.GET)
   .post('/tour/destination/add', tourDestinations.ADD_TOUR_CITY)
   .put('/tour/destination/edit', tourDestinations.UPDATE_TOUR_CITY)
   .delete('/tour/destination/delete', tourDestinations.DELETE_TOUR_CITY)

   // FLY COUNTRIES API
   .get('/fly/countries', flyCountries.GET)
   .post('/fly/country/add', AUTH, FileUpload.single("photo"), flyCountries.ADD_COUNTRY)
   .put('/fly/country/edit', AUTH, FileUpload.single("photo"), flyCountries.UPDATE_COUNTRY)
   .delete('/fly/country/delete', AUTH, flyCountries.DELETE_COUNTRY)

   // FLY CITIES API
   .get('/fly/cities', flyCities.GET)
   .post('/fly/city/add', AUTH, flyCities.ADD_CITY)
   .put('/fly/city/edit', AUTH, flyCities.UPDATE_CITY)
   .delete('/fly/city/delete', AUTH, flyCities.DEETE_CITY)

   // AIRWAY API
   .get('/airways', airway.GET)
   .post('/airway/add', airway.ADD_AIRWAY)
   .put('/airway/edit', airway.UPDATE_AIRWAY)
   .delete('/airway/delete', airway.DELETE_AIRWAY)

   // HOTELS API
   .get('/hotels/list/admin', AUTH, hotels.GET_ADMIN)
   .post('/hotels/list', hotels.GET)
   .post('/hotel/add', AUTH, FileUpload.single("photo"), hotels.ADD_HOTEL)
   .put('/hotel/edit', AUTH, FileUpload.single("photo"), hotels.UPDATE_HOTEL)
   .delete('/hotel/delete', AUTH, hotels.DELETE_HOTEL)

   // TRIP API
   .get('/trips/list/admin', AUTH, trips.GET_ADMIN)
   .post('/trips/list', trips.GET)
   .get('/trip/:id', trips.GET_ID)
   .post('/trip/add', AUTH, FileUpload.fields([{ name: "photos" }, { name: "videos" }]), trips.ADD_TRIP)
   .put('/trip/edit', AUTH, FileUpload.fields([{ name: "photos" }, { name: "videos" }]), trips.UPDATE_TRIP)
   .delete('/trip/delete', AUTH, trips.DELETE_TRIP)

   // NEWS API
   .get('/news/list', news.GET)
   .get('/news/:id', news.GET_ID)
   .post('/news/add', AUTH, FileUpload.single("photo"), news.ADD_NEWS)
   .put('/news/edit', AUTH, FileUpload.single("photo"), news.UPDATE_NEWS)
   .delete('/news/delete', AUTH, news.DELETE_NEWS)

module.exports = router