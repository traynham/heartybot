/**
 * Jest test file for Pokédex functions
 * @module
 * @name _pokedex_tests
 * @category Core
 * @subcategory Pokédex
*/

const find = require('./find')
const perfect = require('./perfect')
const type = require('./type')

describe('Pokédex', () => {

// ==========
//    FIND
// ==========


	test('Find: Find "Foongus"', () => {
		let result = find('Foongus')
		expect(result).toHaveProperty('error', false)
		expect(result).toHaveProperty('count', 1)
		expect(result).toHaveProperty('value.name', 'FOONGUS')
	})
	
	test('Find: Find "Charizard X"', () => {
		let result = find('Charizard X')
		expect(result).toHaveProperty('error', false)
		expect(result).toHaveProperty('count', 1)
		expect(result).toHaveProperty('value.name', 'CHARIZARD MEGA X')
	})
	
	test(`Find: Find "['Mega', 'Char']"`, () => {
		let result = find(['Mega', 'Char'])
		expect(result).toHaveProperty('error', false)
		expect(result).toHaveProperty('count', 2)
		expect(result).toHaveProperty('value.pokemonId', 'CHARIZARD')
	})
	
	test(`Find: Find "['Pika']"`, () => {
		let result = find(['Pika'])
		expect(result).toHaveProperty('error', false)
		expect(result).toHaveProperty('value.name', 'PIKACHU')
	})
	
	test(`Find: Find "Pikachu" using "Pika"`, () => {
		let result = find('Pika')
		expect(result).toHaveProperty('error', false)
		expect(result).toHaveProperty('value.name', 'PIKACHU')
	})

// =============
//    PERFECT
// =============

	test('Perfect: Get perfect CPs for "Darkrai"', () => {
		let result = perfect('Darkrai')
		expect(result).toHaveProperty('error', false)
		expect(result).toHaveProperty('value.perfect', 2136)
	})
	
	test('Perfect: Get perfect CPs for "Bogus"', () => {
		let result = perfect('Bogus')
		expect(result).toHaveProperty('error', true)
	})


// ====================
//    TYPE
// ====================

	test('Type: Find "Dark"', () => {
		let result = type('Dark')
		expect(result).toHaveProperty('value.name', 'dark')
	})
	
	test('Type: Find all types', () => {
		let result = type('all')
		expect(result).toHaveProperty('error',false)
		expect(result).toHaveProperty('count', 18)
	})
	
	test('Type: Find "Bogus"', () => {
		let result = type('bogus')
		expect(result).toHaveProperty('error', true)
	})

})