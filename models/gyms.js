const Sequelize = require('sequelize')
const shortid = require('shortid');

const sequelize = require('../util/sequelize')

const Gyms = sequelize.define('gyms', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	shortid:		Sequelize.STRING,
	gymid:			Sequelize.STRING,
	name:			Sequelize.STRING,
	aka:			Sequelize.STRING,
	acronym:		Sequelize.STRING,
	area:			Sequelize.STRING,
	parking:		Sequelize.STRING,
	coordinates:	Sequelize.STRING,
	address:		Sequelize.STRING,
	amenities:		Sequelize.STRING,
	notes:			Sequelize.TEXT,
	search_extras:	Sequelize.TEXT,
	raidable:		Sequelize.STRING,
	status:			{ type: Sequelize.STRING, allowNull: false, defaultValue: "no" },
	uniqID_type:	Sequelize.STRING,
	uniqID:			Sequelize.STRING,
	searchall:		Sequelize.TEXT,
	name_encoded:	{
		type: Sequelize.VIRTUAL,
		get() {
			return this.name.replace(/ /g, '_')
		}
	},
	area_encoded:	{
		type: Sequelize.VIRTUAL,
		get() {
			return this.area.replace(/ /g, '_').toLowerCase()
		}
	}
})

//Gyms.beforeCreate(function(gym, options) {
Gyms.beforeCreate(function(gym) {
	gym.shortid = shortid.generate()				// GENERATE SHORTID BEFORE CREATE
	gym.acronym = gym.acronym.toLowerCase()			// LOWERCASE GYM ACRONYM PRIOR TO CREATION
	gym.searchall = `${gym.area} ${gym.name} ${gym.acronym} ${gym.search_extras} ${gym.aka} ${gym.coordinates}`
	//gym.gymid = `g${gym.id}`
})

//Gyms.afterCreate(function(gym, options) {
Gyms.afterCreate(function(gym) {
	return gym.update({
		gymid: `g${gym.id}`
	})
})

//Gyms.beforeUpdate(function(gym, options) {
Gyms.beforeUpdate(function(gym) {
	gym.acronym = gym.acronym.toLowerCase()		// LOWERCASE GYM ACRONYM PRIOR TO UPDATE.
	gym.searchall = `${gym.area} ${gym.name} ${gym.acronym} ${gym.search_extras} ${gym.aka} ${gym.coordinates}`
})


module.exports = Gyms;