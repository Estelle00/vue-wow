import Vue from 'vue'

Vue.config.productionTip = false

const testsContext = require.context('../../src/components/', true, /test.js$/)
testsContext.keys().forEach(testsContext)
