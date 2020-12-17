const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbConfig = require('./config/db-config.js');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ 'msg': 'test app' });
});

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('db connected');

}).catch(er => {
    console.log('dbb error', er);
    process.exit();
})

require('./app/routes/employee.routes.js')(app);

app.listen(3600, () => {
    console.log('app start on 3600');
});