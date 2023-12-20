export const WrapperService = (model) => {
	const Services = {}

	Services.create = async (objToSave) => {
		return JSON.parse(JSON.stringify(await model(objToSave).save()))
	}

	Services.createMany = async (arrToSave) => {
		return JSON.parse(JSON.stringify(await model.insertMany(arrToSave)))
	}

	Services.getMany = async (criteria, projection, options = {}) => {
		options.lean = true
		options.virtuals = true
		return await model.find(criteria, projection, options)
	}

	Services.getOne = async (criteria, projection, options = {}) => {
		options.lean = true
		options.virtuals = true
		return await model.findOne(criteria, projection, options)
	}

	Services.getPopulatedMany = async (
		criteria,
		projection,
		populateQuery,
		options = {}
	) => {
		options.lean = true
		options.virtuals = true
		return await model
			.find(criteria, projection, options)
			.populate(populateQuery)
			.exec()
	}

	Services.updateOne = async (criteria, dataToUpdate, options = {}) => {
		const updateQuery = {
			$set: {
				...dataToUpdate
			}
		}
		options.lean = true
		options.virtuals = true
		options.new = true
		options.upsert = true
		return await model.findOneAndUpdate(criteria, updateQuery, options)
	}

	Services.updateMany = async (criteria, dataToUpdate, options = {}) => {
		options.lean = true
		options.virtuals = true
		options.new = true
		return await model.updateMany(criteria, dataToUpdate, options)
	}

	Services.deleteOne = async (criteria) => {
		return await model.deleteOne(criteria)
	}

	Services.deleteMany = async (criteria) => {
		return await model.deleteMany(criteria)
	}

	Services.count = async (criteria) => {
		return await model.countDocuments(criteria)
	}

	Services.aggregate = async (group) => {
		return await model.aggregate(group)
	}

	return Services
}