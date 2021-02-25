/**
 * Jest test file for detect functions
 * @module
 * @name _detect_tests
 * @category Core
 * @subcategory Detect
*/

const action = require('./action')
const boss = require('./boss')
const boss_tier = require('./boss_tier')
const code = require('./code')
const duration = require('./duration')
const isEgg = require('./isEgg')
const level = require('./level')
const team = require('./team')
const time = require('./time')

describe('Detect', () => {
	
	// ACTION
	test('Action: Returns "level" action', () => {
		expect(action('lvl')).toHaveProperty('value', 'level')
	})
	
	test('Action: Returns an error', () => {
		expect(action('bogus')).toHaveProperty('error', true)
	})


	// BOSS
	test('Boss: Error on blank search', () => {
		expect(boss('')).toHaveProperty('error', true)
	})
	
	test('Boss: Detect "Tier 3" using "lvl3" as term.', () => {
		expect(boss('lvl3')).toHaveProperty('value', 'Tier 3')
	})
	
	test('Boss: Detect "Tier 5" using "lvl 5" as term. (has space)', () => {
		expect(boss('lvl 5')).toHaveProperty('value', 'Tier 5')
	})
	
	test('Boss: Detect "Mega" using "mega" as term.', () => {
		expect(boss('mega')).toHaveProperty('value', 'Mega')
	})

	test('Boss: Detect first mega as term.', () => {
		let mega = boss('mega ').value[0]
		expect(boss(mega)).toHaveProperty('value', mega)
	})
	
	test('Boss: Detect "Bogus". (Will have zero count)', () => {
		expect(boss('bogus')).toHaveProperty('count', 0)
	})
/*	
	test('Boss: Detect "Char". (To many results)', () => {
		expect(boss('char')).toHaveProperty('error', true)
	})
*/
	test('Boss: Detect "".', () => {
		expect(boss('')).toHaveProperty('error', true)
	})


	// BOSS_TIER
	test('Boss Tier: returns "Tier 5"', () => {
		expect(boss_tier('l5')).toHaveProperty('value', 'Tier 5')
	})

	test('Boss Tier: returns "Mega"', () => {
		expect(boss_tier('mega')).toHaveProperty('value', 'Mega')
	})
	
	test('Boss Tier: returns an error', () => {
		expect(boss_tier('bogus')).toHaveProperty('error', true)
	})


	// CODE
	test('Code: Detect "Bogus" code', () => {
		expect(code('bogus')).toHaveProperty('error', true)
	})
	
	test('Code: Detect "123456789012" code', () => {
		expect(code('123456789012')).toHaveProperty('error', false)
	})
	
	test('Code: Detect "1234 5678 9012" code', () => {
		expect(code('1234 5678 9012')).toHaveProperty('error', false)
	})
	
	
	// DURATION
	test('Duration: Detect "Bogus" duration', () => {
		expect(duration('bogus')).toHaveProperty('error', true)
	})
	
	test('Duration: Detect "10m" duration', () => {
		expect(duration('10m')).toHaveProperty('error', false)
	})
	
	test('Duration: Detect "10m" duration match value from "starts in 10m!"', () => {
		expect(duration('starts in 10m!')).toHaveProperty('matched', '10m')
	})
	
	test('Duration: Detect "25 minutes" match from "Starts in 25 minutes or so."', () => {
		expect(duration('Starts in 25 minutes or so.')).toHaveProperty('matched', '25 minutes')
	})
	
	test('Duration: Detect duration from "30"', () => {
		expect(duration('30')).toHaveProperty('error', false)
	})
	
	
	// ISEGG
	test('isEgg: Detect "Bogus" isEgg', () => {
		expect(isEgg('bogus')).toHaveProperty('error', true)
	})
	
	test('isEgg: Detect "Mega" isEgg', () => {
		expect(isEgg('Mega')).toHaveProperty('value', true)
	})
	
	test('isEgg: Detect "Tier 3" isEgg', () => {
		expect(isEgg('Tier 3')).toHaveProperty('value', true)
	})
	
	test('isEgg: Detect "tier 3" isEgg (Will fail beause of case.)', () => {
		expect(isEgg('tier 3')).toHaveProperty('value', false)
	})
	
	
	// Level
	test('Level: Detect "Bogus" level (Trainer level must be a number.)', () => {
		expect(level('bogus')).toHaveProperty('error', true)
	})
	
	test('Level: Detect trainer level "15"', () => {
		expect(level(15)).toHaveProperty('value', 15)
	})
	
	test('Level: Throw error on trainer level "0" (Level must be between 1-50)', () => {
		expect(level(0)).toHaveProperty('error', true)
	})
	
	test('Level: Throw error on trainer level "60" (Level must be between 1-50)', () => {
		expect(level(60)).toHaveProperty('error', true)
	})
	
	
	// TEAM
	test('Team: Detect "Bogus" team.', () => {
		expect(team('bogus')).toHaveProperty('error', true)
	})
	
	test('Team: Detect "red" team.', () => {
		expect(team('red')).toHaveProperty('value', 'Valor')
	})
	
	test('Team: Detect "val" team.', () => {
		expect(team('val')).toHaveProperty('value', 'Valor')
	})
	
	test('Team: Detect "valor" team.', () => {
		expect(team('valor')).toHaveProperty('value', 'Valor')
	})
	
	test('Team: Detect empty args.', () => {
		expect(team('')).toHaveProperty('error', true)
	})
	
	test('Team: Detect "[\'valor\']" team.', () => {
		expect(team(['valor'])).toHaveProperty('value', 'Valor')
	})
	
	
	// TIME
	test('Time: Detect "Bogus" time.', () => {
		expect(time('bogus')).toHaveProperty('error', true)
	})
	
	test('Time: Detect noon', () => {
		expect(time('12:00')).toHaveProperty('type', 'time')
	})
	
	test('Time: Detect time in "It starts at 3:45pm or so."', () => {
		expect(time('It starts at 3:45pm or so.')).toHaveProperty('type', 'time')
	})
	
	test('Time: Check matched in "It starts at 3:45 pm or so."', () => {
		expect(time('It starts at 3:45 pm or so.')).toHaveProperty('matched', '3:45 pm')
	})
	
})