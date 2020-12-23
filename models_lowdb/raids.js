/**
	* Lowdb model for creating/updating/archiving/deleting raids.
	* Functionality is included for dealing with trainers too.
	*
	* ## History:
	* - 09-23-20 Birth
	* - 11-04-20 Refactored with better name prefixing.
	*
	* -----
	
	* @module Raids
	* @author Jesse Traynham
	* @category LowDB

	* @since 09-23-20 Birth
	* @since 11-04-20 Refactored with better name prefixing.
 
**/

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const dateFormat = require('dateformat')

const {me} = require(`@core`)
const payload_obj = require('@core/util/payload')
const file = require('@core/util/file')

//const adapter = new FileSync('./data/raids.json')
const adapter = new FileSync('./data/cache/raids.json')
const db = low(adapter)

db.defaults({
	raids: [
		{
			boss: '',
			channel: '',
			name: '',
			pull: '',
			status: '',
			time: '',
			trainers: [],
			gym: {}
		}
	],
	ouroboros: ''
}).write()

// LOCATE RAID HELPER FUNCTION
/**
* Private Locate raid function. Returns raid object.
* @private
* @param {string} q The gym name or channel snowflake.
* @returns {object}
**/
const _locateRaid = (q) => {
	/* MAKE PAYLOAD AND RETURN ERRORS AND SUCH? */
	let raid = db.get('raids').find({ channel: q })
	if(!raid.value()) raid = db.get('raids').find({ name: q })
	return raid
}

module.exports = {
	
	// ============================	
	// RAIDS
	// ============================

	/**
		* Add a raid. See {@tutorial test}
		* @param {object} raid - Raid object to add to raids.json.
		* @type {payload}
		* @returns {payload}
	*/
	raids_add: (raid) => {

		let payload = payload_obj()

		if(_locateRaid(raid.name).value()){
			payload.error = true
			payload.error_message = 'Raid already exists.'
			return payload
		}

		raid.trainers = []
		raid.pull = null
		payload.value = db.get('raids').push(raid).write()
		return payload

	},

	// ARCHIVE RAID
	/**
		* Archive a raid.
		* @param {string} q - The gym name or channel snowflake.
		* @returns {void}
	*/
	raids_archive(q) {
		
		let payload = payload_obj()
		let raid = _locateRaid(q)
		let raid_value = raid.value()
		
		if(!raid.value()){
			payload.error = true
			payload.error_message = 'Raid not found.'
			return payload
		}
		
		let date = new Date(raid_value.time)

		//let date_path = '/data/raids/' + dateFormat(date, 'yyyy/mm/dd/') + `${date.getTime()} ${raid_value.name}.json`
		let date_path = '/data/cache/raids/' + dateFormat(date, 'yyyy/mm/dd/') + `${date.getTime()} ${raid_value.name}.json`

		file.createFile(date_path, raid_value)
		
		db.get('raids').remove({name: raid.value().name}).write()
		
		return payload
		
	},

	// FIND RAID
	/**
		* Find a raid.
		* @param {string} q - The gym name or channel snowflake.
		* @returns {payload}
	*/
	raids_find: (q) => {
		return _locateRaid(q).value()
	},
	
	// LIST RAIDS
	/**
		* List raids. Returns array of raid objects.
		* @returns {array}
	*/
	raids_list: () => {
		return db.get('raids').value()
	},

	// UPDATE RAID
	/**
		* Update a raid. Returns a raid objects.
		* @param {string} q The gym name or channel snowflake.
		* @param {string} key The key to update.
		* @param {string} value The value to set key to.
		* @returns {object}
		* @todo Allow an object of values to be updated. (Pass multiple key/values)
	*/
	raids_update: (q, key, value) => {
		
		let payload = payload_obj()	
		let raid = _locateRaid(q)
		
		if(!raid.value()){
			payload.error = true
			payload.error_message = 'Raid not found.'
			return payload
		}
		
		return raid.set(key, value).write()

	},

	// SET NODE
	/**
		* Sets a key at the root level of raids.json. This should not be used to set raid data. Use for setting update timestamps and the like.
		* @param {string} key The key to set or update.
		* @param {string|object|integer|date} value The value to set.
		* @returns {array}
		* @todo USE BETTER NAME => root_set ?
	*/
	set: (key, value) => {
		return db.set(key, value).write()
	},


	// ============================	
	// TRAINERS
	// ============================

	/**
		* Find a trainer
		* @param {string} q - The gym name or channel snowflake.
		* @param {object} trainer Trainer object
		* @returns {payload}
		* @todo Document trainer object.
	*/
	trainers_find: (q, trainer) => {
		
		let payload = payload_obj()
		let raid = _locateRaid(q)
		
		if(!raid.value()){
			payload.error = true
			payload.error_message = 'Raid not found.'
			return payload
		}
	
		let trainer_find = raid.get('trainers').find({"id": trainer.id}).value()
	
		if(!trainer_find){
			payload.error = true
			payload.error_message = 'Trainer not found.'
			return payload
		}
	
		payload.value = trainer_find
	
		return payload
	
	},
	
	// LIST TRAINERS
	/**
		* List trainer
		* @param {string} q - The gym name or channel snowflake.
		* @returns {payload}
	*/
	trainers_list: (q) => {
		
		let payload = payload_obj()
		let raid = _locateRaid(q)
		
		if(!raid.value()){
			payload.error = true
			payload.error_message = 'Raid not found.'
			return payload
		}
	
		let trainers = raid.get('trainers').value()
	
		payload.value = trainers
		payload.count = trainers.length
		
		return payload
	
	},

	/**
		* Find a trainer
		* @async
		* @param {string} q - The gym name or channel snowflake.
		* @param {object} trainer Trainer object
		* @see https://discord.js.org/#/docs/main/stable/class/User
		* @returns {payload}
	*/
	trainers_updateOrCreate: async (q, trainer) => {

		let payload = payload_obj()
		let raid = _locateRaid(q)
		
		if(!raid.value()){
			payload.error = true
			payload.error_message = 'Raid not found.'
			return payload
		}

		// GRAB ME RECORD FROM SQLITE
		let member = await me.findOrCreate(trainer)

		trainer.privacy = member.value.privacy.split(',')

		if(!member.error){

			let privacy = member.value.privacy.split(',')
			
			trainer.code = privacy.includes('code') ? null : member.value.trainer_code
			trainer.level = privacy.includes('level') ? null : member.value.level

			// I think this works properly. :)  Don't overwrite team if it's in trainer.
			if(!trainer.team){
				trainer.team = privacy.includes('team') ? null : member.value.team
			}

		}

		let trainer_find = raid.get('trainers').find({"id": trainer.id})
		
		if(trainer_find.value()){
			trainer_find.assign(trainer).write()
		} else {
			raid.get('trainers').push(trainer).write()
		}

		payload.value = trainer

		return payload

	}

} //MODULE.EXPORTS

