#!/usr/bin/env node

/*
require('dotenv').config({ path: '../config/.env' })

const moduleAlias = require('module-alias')
moduleAlias(__dirname + '/../package.json')

*/

require('module-alias/register')

const config = require('@config')


console.log(config)
console.log('Hearty CLI Tool')