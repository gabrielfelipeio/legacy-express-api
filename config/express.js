const express = require('express');
const cfenv = require('cfenv');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');
const appEnv = cfenv.getAppEnv();

module.exports = function() {
    const app = express();

    app.set('port', appEnv.port);
    app.set('url', appEnv.url);

    app.use(cors());
    app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use("/documentation", express.static("./documentation/api-doc"));

    consign({
            cwd: 'app'
        })
        .include('routes')
        .into(app);

    app.get('/', (req, res) => res.status(200).send('Payment Guides API - Elaw LAB - PRD'));
    return app;
}