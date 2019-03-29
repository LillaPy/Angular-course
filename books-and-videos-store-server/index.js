'use strict';
const jsonServer   = require('json-server');
const YAML         = require('yamljs');
const PATH         = require('path');
const CRYPTO       = require('crypto');
const JWT          = require('njwt');
const genRandomKey = require('secure-random');

const PORT      = 5000;
const TOKEN_HDR = 'X-Auth-Token';
const KEY       = genRandomKey(256, {type: 'Buffer'});
const users     = [
    {
        id: 1,
        username: 'admin',
        password: hashPassword('4dm1n'),
        name: 'Nisse Hult',
        email: 'nisse.hult@ribomation.se'
    }
];
const products  = loadProducts(`${__dirname}/products.yml`);
const db        = {
    users: users,
    books: products.books,
    videos: products.videos,
    orders: []
};

const server = jsonServer.create();
server.use(jsonServer.defaults({
    static: './assets'
}));
server.use(jsonServer.bodyParser);

server.post('/auth/login', (req, res) => {
    const body = req.body;
    console.info('*** [login]', body);
    const user = lookupUser(body.username, body.password);
    if (user) {
        const claims = {
            iss: 'http://localhost:5000/',
            sub: user.username,
            email: user.email,
            role: 'admin'
        };
        const token  = JWT.create(claims, KEY);
        res.status(201).send(token.compact());
    } else {
        res.sendStatus(401);
    }
});

server.use((req, res, next) => {
    if (authRequired(req)) {
        if (isAuthenticated(req)) {
            next();
        } else {
            res.sendStatus(401);
        }
    } else {
        next();
    }
});

server.use('/api', jsonServer.router(db));

server.listen(PORT, () => {
    console.log('Books & Videos Server running: http://localhost:5000/');
});


function loadProducts(ymlFile) {
    let nextId    = 1;
    const baseUrl = `http://localhost:${PORT}/img/`;

    const products = YAML.load(ymlFile);
    const books    = products.books
        .map(obj => {
            obj.id       = nextId++;
            obj.imageUrl = baseUrl + obj.image;
            return obj;
        });
    const videos   = products.videos
        .map(obj => {
            obj.id       = nextId++;
            obj.imageUrl = baseUrl + obj.image;
            return obj;
        });

    return {
        books: books,
        videos: videos
    };
}

function hashPassword(password) {
    const SALT = 'The Books & Videos Store Secret Phrase!!';
    return CRYPTO.createHmac('sha1', SALT).update(password).digest('hex');
}

function isAuthenticated(req) {
    const token = req.get(TOKEN_HDR);
    if (token && token.trim().length > 0) {
        try {
            JWT.verify(token, KEY);
            return true;
        } catch (x) {
        }
    }
    return false;
}

function authRequired(req) {
    console.info('[authRequired]', req.method, req.originalUrl);

    const protectedRequests = [
        {uri: '/api/products', methods: ['POST', 'PUT', 'DELETE']},
        {uri: '/api/users', methods: ['GET', 'POST', 'PUT', 'DELETE']},
        {uri: '/api/orders', methods: ['GET', 'PUT', 'DELETE']},
        {uri: '/api/admin', methods: ['GET', 'POST', 'PUT', 'DELETE']}
    ];

    return protectedRequests.some(r =>
        req.originalUrl.startsWith(r.uri) && r.methods.some(m => req.method === m)
    );
}

function lookupUser(username, password) {
    const PASSWORD = hashPassword(password);
    return users.find(u => u.username === username && u.password === PASSWORD);
}





