const moment = require('moment');
const _ = require('lodash');
const i18n = require('i18n');
const fs = require('fs');
const { ApolloError, AuthenticationError } = require('apollo-server');

const validator = require('../../../validator/validator');
const Animal = require('../../../models/Animal');
const User = require('../../../models/User');
const ERROR_TYPES = require('../../../errorTypes');


const animalMutations = {
	createPet: async (_, { createPetInput }) => {
		console.log("cpi:", createPetInput);
		const { type, name, age, breed, characteristics, description, gender, image, phone } = createPetInput;

		const isEmpty = validator.isFieldsEmpty(createPetInput);
		if (!isEmpty) {
			const user = await User.findOne({ phone });
			if (!user) {
		      throw new AuthenticationError(ERROR_TYPES.AUTHENTICATION_ERROR.text, ERROR_TYPES.AUTHENTICATION_ERROR.code);
		    }

		    const newPet = new Animal({
		    	name,
		    	code: 1000,
		    	breed,
		    	ageInterval: age,
		    	gender,
		    	animalType: type,
		    	description,
		    	characteristics,
		    	profilePhoto: image,
		    	user,
		    	shelter: user.shelter
		    });

		    const newPetResult = await newPet.save();
		    console.log("saved", newPetResult);

			return { pet: newPetResult._doc };
		}
	},
}

module.exports = animalMutations;
