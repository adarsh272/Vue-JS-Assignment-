const { readJSONFile, writeJSONFile } = require('../utils/fileHandler');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid'); /* To generate unique ID for each country before storing */

const getCountries = (req, res) => {
    /* Get all countries from JSON file to display in UI homepage dropdown*/
    const countries = readJSONFile('countries.json');
    res.json(countries);
};

const getContinents = (req, res) => {
    /* Get all 'UNIQUE' continents from JSON file to display in UI form dropdown*/
    const countries = readJSONFile('countries.json');
    const uniqueContinents = new Set()
    countries.countries.forEach(country => uniqueContinents.add(country.continent))
    const continents = Array.from(uniqueContinents).map((continent) => { return { id: continent, name: continent } })
    res.json(continents);
};

const getCountryById = (req, res) => {
    /* Get individual country detials from JSON file to display in UI homepage*/
    const countries = readJSONFile('countries.json');
    const country = countries.countries.find(c => c.id == req.params.id);
    if (country) {
        res.json(country);
    } else {
        res.status(404).json({ message: 'Country not found' });
    }
};

/* Validation function for server side security. Can be extended wiith XSS insurance. Also can be extracted into its own global file*/
const validateCountryData = (name, rank, image, countries) => {
    let errors = {};

    // Validate Name
    if (typeof name !== 'string' || name.length < 3 || name.length > 20) {
        errors.name = 'Name must be a string between 3 and 20 characters.';
    } else if (/[^a-zA-Z0-9 ]/.test(name)) {
        errors.name = 'Name must not contain special characters.';
    } else if (countries.some(country => country.name.toLowerCase() === name.toLowerCase())) {
        errors.name = 'Country name already exists in the database.';
    }

    // Validate Rank
    const numericRank = Number(rank);
    if (isNaN(numericRank)) {
        errors.rank = 'Rank must be numeric only.';
    }

    // Validate Image
    if (!image) {
        errors.image = 'Image is required.';
    } else {
        const allowedExtensions = ['jpg', 'jpeg', 'png'];
        const fileExtension = path.extname(image.originalname).substring(1).toLowerCase();
        const maxSize = 4 * 1024 * 1024; // 4MB

        if (!allowedExtensions.includes(fileExtension)) {
            errors.image = 'Image must be either jpg or png.';
        } else if (image.size > maxSize) {
            errors.image = 'Image size must not exceed 4MB.';
        }
    }

    return errors;
};

/* Add country if above validations are successfull*/
const addCountry = (req, res) => {
    const countriesData = readJSONFile('countries.json');
    const { name, continent, rank } = req.body;
    const image = req.file;

    // Validate country data
    const errors = validateCountryData(name, rank, image, countriesData.countries);

    // If there are validation errors, return them in the response
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ error: errors });
    }

    const newCountry = {
        id: uuidv4(),
        name,
        continent,
        rank,
        flag: `images/${image.originalname}`
    };

    countriesData.countries.push(newCountry);
    writeJSONFile('data/countries.json', countriesData);

    // Move the uploaded image to the correct directory
    const imagePath = path.join(__dirname, '..', 'images', image.originalname);
    fs.renameSync(image.path, imagePath);

    return res.status(201).json({ message: "Country added successfully", country: newCountry });
};

module.exports = { getCountries, getCountryById, getContinents, addCountry };
