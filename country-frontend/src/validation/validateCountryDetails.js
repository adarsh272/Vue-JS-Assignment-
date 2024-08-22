import { ref } from 'vue';
/* Custom Hook - Dedicated validation hook for AddNewCountryForm component*/
export function validateCountryDetails() {
    const errors = ref({});
    /*
    Rules:
    - Min 3 chars and Max 20 chars
    - No special characters allowed
    - Required Field
    */
    const validateName = (name) => {
        if (!name || name.length < 3 || name.length > 20) {
            errors.value.name = "Name must be between 3 and 20 characters.";
        } else if (/[^a-zA-Z\s]/.test(name)) {
            errors.value.name = "Name must not contain special characters.";
        } else {
            delete errors.value.name;
        }
    };

    const validateImage = (file) => {
        /*
       Rules:
       - Only JPG and PNG allowed
       - Required Field
       - Max 4 MB file allowed
       */
        if (!file || !['image/jpeg', 'image/png'].includes(file.type)) {
            errors.value.image = "Image must be a JPG or PNG.";
        } else if (file.size > 4 * 1024 * 1024) {
            errors.value.image = "Image size must be less than or equal to 4MB.";
        } else {
            delete errors.value.image;
        }
    };

    const validateRank = (rank) => {
        /*
        Rules:
        - Only numbers allowed
        - Required Field
        */
        if (!rank || isNaN(rank)) {
            errors.value.rank = "Rank must be a number.";
        } else {
            delete errors.value.rank;
        }
    };

    const validateContinent = (continent) => {
        /*
        Rules:
        - Required Field
        */
        if (continent.length === 0) {
            errors.value.continent = 'Required Field'
        } else {
            delete errors.value.continent
        }
    }

    const validateForm = (formData) => {
        /* To be run on final form submission from UI - final check for UI validations*/
        validateName(formData.countryName);
        validateImage(formData.image);
        validateRank(formData.rank);
        validateContinent(formData.continent)
        // Add more validations as needed.
        return Object.keys(errors.value).length === 0;
    };

    return {
        errors,
        validateName,
        validateImage,
        validateRank,
        validateContinent,
        validateForm
    };
}
