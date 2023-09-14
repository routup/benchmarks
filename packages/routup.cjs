'use strict'

const { createServer } = require('node:http')
const { Router, createNodeDispatcher, send } = require('routup')

const router = new Router({
    etag: false
});

router.get('/', (req, res) => {
    return send(res, {hello: 'world'});
});

createServer(createNodeDispatcher(router))
    .listen(3000)
