const Sequelize = require('sequelize')
const shortid = require('shortid');

const sequelize = require('../util/sequelize')

const Areas = sequelize.define('areas', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	shortid:		Sequelize.STRING,
	name:			Sequelize.STRING,
	aka:			Sequelize.STRING,
	map_term:		Sequelize.STRING,
	related:		Sequelize.STRING,
	notes:			Sequelize.TEXT,
	description:	Sequelize.TEXT,
	active:			Sequelize.STRING,
	gyms:			Sequelize.INTEGER,
	name_encoded:	{
		type: Sequelize.VIRTUAL,
		get() {
			return this.name.replace(/ /g, '_').toLowerCase();
		}
	},
	aka_encoded:	{
		type: Sequelize.VIRTUAL,
		get() {
			return this.area.replace(/ /g, '_');
		}
	}
})

// GENERATE SHORTID BEFORE CREATE
//Areas.beforeCreate(function(area, options) {
Areas.beforeCreate(function(area) {
	area.shortid = shortid.generate()
})

module.exports = Areas;