const express = require('express');
const multer = require('multer');
/* Handling image uploads through multer*/
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });
const { getCountries, getCountryById, addCountry, getContinents } = require('../controllers/countryController');

/* Managing routes for all API endpoints and evoking the corresponding controller function*/
const router = express.Router();
router.get('/countries', getCountries);
router.get('/country/:id', getCountryById);
router.get('/continents', getContinents);
router.post('/country', upload.single('image'), addCountry);

module.exports = router;
