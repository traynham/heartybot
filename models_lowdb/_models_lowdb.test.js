/**
 * Jest test file for LowDB Models
 * @module
 * @name _models_lowdb_tests
 * @category LowDB
 * @@subcategory Me
*/

const bosses = require('./bosses')
const raids = require('./raids')

const {gyms} = require('@core')


describe('LowDB', () => {


// ==========
//    BOSSES
// ==========

	test('BOSSES: Return bosses, truthy test', () => {
		let result =  bosses.bosses()
		expect(result).toBeTruthy
	})
	
	test('BOSSES: Add "Totally Fake Test Pokemon"', () => {
		let result =  bosses.add('Tier 1', {name:'Totally Fake Test Pokemon'})
		expect(result).toBeTruthy
	})
	
	test('BOSSES: Add "Totally Fake Test Pokemon Again"', () => {
		let result =  bosses.add('Tier 1', {name:'Totally Fake Test Pokemon'})
		expect(result).toBeTruthy
	})
	
	test('BOSSES: Remove "Totally Fake Test Pokemon"', () => {
		let result =  bosses.remove('Totally Fake Test Pokemon')
		expect(result).toBeTruthy
	})
	
	// TEST BOSSES.SET ?
	
// ====================
//    RAIDS
// ====================

	test('RAIDS: List current raids', () => {
		let result =  raids.raids_list()
		expect(result).toBeTruthy
	})
	
	const gym_name = 'Totally Fake Test Gym'
	const channel_id = 'Totally Fake Channel ID'
	const trainer = {
		"id": "209016296552136704",
		"username": "heartyjessman"
	}
	
	test(`RAIDS: Add new raid for the "${gym_name}" gym.`, async () => {
		let gym = await gyms.find(gym_name)
		let result =  raids.raids_add({
			channel: channel_id,
			name: gym_name,
			time: new Date(),
			gym:gym.gym
		})
		expect(result).toHaveProperty('error', false)
	})
	
	test(`RAIDS: Add new raid for the "${gym_name}" gym again to fail.`, async () => {
		let gym = await gyms.find(gym_name)
		let result =  raids.raids_add({
			channel: channel_id,
			name: gym_name,
			time: new Date(),
			gym:gym.gym
		})
		expect(result).toHaveProperty('error', true)
	})
	
	test(`RAIDS: Find raid by "${channel_id}" channel id.`, async () => {
		let result = await raids.raids_find(channel_id)
		expect(result).toHaveProperty('name', gym_name)
	})
	
	test(`RAIDS: Set "pull" at "${gym_name}" raid.`, async () => {
		let pull = new Date()
		let result = await raids.raids_update(gym_name, 'pull', pull)
		expect(result).toHaveProperty('pull', pull)
	})


	test(`RAIDS: Add trainer to raid.`, async () => {
		let result = await raids.trainers_updateOrCreate(gym_name, trainer)
		expect(result).toHaveProperty('error', false)
	})
	
	test(`RAIDS: Add trainer to "Bogus" raid.`, async () => {
		let result = await raids.trainers_updateOrCreate('bogus', trainer)
		expect(result).toHaveProperty('error', true)
	})
	
	test(`RAIDS: Set trainer eta to now.`, async () => {
		trainer.eta = new Date()
		let result = await raids.trainers_updateOrCreate(gym_name, trainer)
		expect(result).toHaveProperty('value.eta', trainer.eta)
	})
	
	test(`RAIDS: Find trainer in ${gym_name} raid.`, async () => {
		let result = await raids.trainers_find(gym_name, trainer)
		expect(result).toHaveProperty('value.username', 'heartyjessman')
	})
	
	test(`RAIDS: Find "bogus" trainer in ${gym_name} raid.`, async () => {
		let result = await raids.trainers_find(gym_name, {id: 'bogus'})
		expect(result).toHaveProperty('error', true)
	})
	
	test(`RAIDS: Find trainer in "Bogus" raid.`, async () => {
		let result = await raids.trainers_find('bogus', trainer)
		expect(result).toHaveProperty('error', true)
	})
	
	test(`RAIDS: List trainers.`, async () => {
		let result = await raids.trainers_list(gym_name)
		expect(result).toHaveProperty('count', 1)
	})
	
	test(`RAIDS: List trainers in "Bogus" raid.`, async () => {
		let result = await raids.trainers_list("Bogus")
		expect(result).toHaveProperty('error', true)
	})



	test(`RAIDS: Set "pull" at "Bogus" raid.`, async () => {
		let pull = new Date()
		let result = await raids.raids_update('bogus', 'pull', pull)
		//console.log(result)
		expect(result).toHaveProperty('error', true)
	})
	
	test(`RAIDS: Archive the "${gym_name}" raid.`, async () => {
		let result = await raids.raids_archive(gym_name)
		expect(result).toHaveProperty('error', false)
	})
	
	test(`RAIDS: Archive the "Bogus" raid.`, async () => {
		let result = await raids.raids_archive('bogus')
		expect(result).toHaveProperty('error', true)
	})
	
	test(`RAIDS: Set "modified" field`, async () => {
		let modified = new Date()
		let result = await raids.set('modified', modified)
		expect(result).toHaveProperty('modified', modified)
	})
	
	/*
	test(`RAIDS: Delete the "${gym_name}" raid from list.`, async () => {
		let result = await raids.raids_delete(gym_name)
		console.log(result)
		expect(result).toHaveProperty('error', false)
	})
	*/
	

/*
	test('Find: Find "heartytestman" by nickname', async () => {
		let result = await find({nickname:'heartytestman'})
		expect(result).toHaveProperty('nickname', 'heartytestman')
	})
	
	test('Find: Find "heartyjessman" by trainer_code', async () => {
		let result = await find({trainer_code:'444329721291'})
		expect(result).toHaveProperty('nickname', 'heartyjessman')
	})



	test('findOrCreate: Find heartyjessman\'s record', async () => {
		let result = await findOrCreate({
			id: '209016296552136704',
			username: 'heartyjessman',
			discriminator: '1926'
		})
		expect(result).toHaveProperty('value.nickname', 'heartyjessman')
		expect(result).toHaveProperty('value.snowflake', '209016296552136704')
	})


// ==========
//    SET
// ==========

	test('Set: Set heartyjessman\'s team to "Valor"', async () => {
		let result = await set('646', {team:'Valor'})
		expect(result).toBe(1)
	})

*/


})