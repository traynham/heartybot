const Sequelize = require('sequelize')
//const shortid = require('shortid');

const sequelize = require('../util/sequelize')

const Members = sequelize.define('member', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},

	status:						{
									type: Sequelize.STRING, 
									defaultValue: "approved"
								},

	// DISCORD
	nickname:					Sequelize.STRING,
	nickname_discriminator:		Sequelize.STRING,
	snowflake:					Sequelize.STRING,
	member_avatar:				Sequelize.STRING,
	member_avatar_url:			Sequelize.STRING,

	// POGO
	trainer_name:				Sequelize.STRING,
	trainer_code:				Sequelize.STRING,
	level:						Sequelize.INTEGER,
	team:						Sequelize.STRING,
	started:					Sequelize.DATE,
	
	// GENERAL
	motto:						Sequelize.STRING,
	privacy:					Sequelize.TEXT,
	note:						Sequelize.TEXT,
	
	// MET GAME
	met_snowflakes_pending:		Sequelize.TEXT,
	met_snowflakes_confirmed:	Sequelize.TEXT

})

//Members.beforeCreate(function(member, options) {
Members.beforeCreate(function(member) {
	
	// WRAP IN TRY SO THAT IT CAN FAIL SILENTLY WHEN NO CODE IS AVAILABLE	
	try {
		member.trainer_code = member.trainer_code.replace(/ /g, '')		// Remove Spaces from code
	} catch (error) {
		console.error(error);
	}
	
})

//Members.beforeUpdate(function(member, options) {
Members.beforeUpdate(function(member) {
	member.trainer_code = member.trainer_code.replace(/ /g, '')		// Remove Spaces from code
})

module.exports = Members;