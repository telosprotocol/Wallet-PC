'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    BASE_API: '/api/',
    rpcHost: '"/api/top/v2/"',
    serverHost: '"/api/"',
})