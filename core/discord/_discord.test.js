/**
 * Jest test file for discord functions
 * @module
 * @name _discord_tests
 * @category Core
 * @subcategory Discord
*/

const Discord = require('discord.js')

const embedPokemon = require('./embedPokemon')
const hasRole = require('./hasRole')
const isAdmin = require('./isAdmin')
const parseRaid = require('./parseRaid')
const setImage = require('./setImage')
const setThumbnail = require('./setThumbnail')

describe('Discord', () => {
	
//	beforeAll(() => {
//	})
	
	// EMBEDPOKEMON
	test('embedPokemon: Test using "Tier 1" egg search.', () => {
		const embed = new Discord.MessageEmbed()
		expect(embedPokemon(embed, 'Tier 1')).toHaveProperty('error', false)
	})

	test('embedPokemon: Test using "Bulbasaur" pokemon search. (2 types)', () => {
		const embed = new Discord.MessageEmbed()
		expect(embedPokemon(embed, 'Bulbasaur')).toHaveProperty('error', false)
	})
	
	test('embedPokemon: Test using "Absol" pokemon search. (1 Types)', () => {
		const embed = new Discord.MessageEmbed()
		expect(embedPokemon(embed, 'Absol')).toHaveProperty('error', false)
	})
	
	test('embedPokemon: Test using "Absol" pokemon search. (Show Perfect)', () => {
		const embed = new Discord.MessageEmbed()
		expect(embedPokemon(embed, 'Absol', ['Perfect'])).toHaveProperty('error', false)
	})

	test('embedPokemon: Test using "bogus" pokemon search.', () => {
		const embed = new Discord.MessageEmbed()
		expect(embedPokemon(embed, 'bogus')).toHaveProperty('error', true)
	})
	
	
	// HASROLE
	
	// MOCK MESSAGE OBJECT
	let message = {
		member: {
			roles: {
				cache: [
					{name: 'admin'},
					{name: 'su'},
					{name: 'admin'},
					{name: 'everyone'}
				]
			}
		}
	}

	test('hasRole: Has "admin" role', () => {
		expect(hasRole(message, 'admin')).toBe(true)
	})
	
	test('hasRole: Has "bogus" role', () => {
		expect(hasRole(message, 'bogus')).toBe(false)
	})


	// ISADMIN
	test('isAdmin: Has "admin" role', () => {
		expect(isAdmin(message)).toBe(true)
	})


	// PARSERAID
	
	const parseRaid_q = {value:'l5 10m frog'}
	
	test(`parseRaid: Extract gym from "${parseRaid_q.value}"`, async () => {
		expect(await parseRaid.extract_gym(parseRaid_q)).toHaveProperty('gym.name', 'Frog')
	})
	
	test(`parseRaid: Extract boss from "${parseRaid_q.value}"`, async () => {
		expect(await parseRaid.extract_boss({value:'l5 10m frog'})).toHaveProperty('value', 'Tier 5')
	})
	
	test(`parseRaid: Extract time from "${parseRaid_q.value}" (will return null)`, async () => {
		expect(await parseRaid.extract_time(parseRaid_q)).toBe(null)
	})

	test(`parseRaid: Extract duration from "${parseRaid_q.value}"`, async () => {
		expect(await parseRaid.extract_duration(parseRaid_q)).toHaveProperty('error', false)
	})
	
	
	// SETIMAGE
	test('setImage: Build image attachment test', async () => {
		const embed = new Discord.MessageEmbed()
		expect(await setImage(embed, 'public/images/infographics/types.png', 'types.png')).toHaveProperty('image.url', 'attachment://types.png')
	})
	
	// SETTHUMBNAIL
	test('setThumbnail: Build thumnail attachment test', async () => {
		const embed = new Discord.MessageEmbed()
		expect(await setThumbnail(embed, 'public/images/infographics/types.png', 'types.png')).toHaveProperty('thumbnail.url', 'attachment://types.png')
	})
	
	
})