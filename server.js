var mongoose = require('mongoose');
var db = mongoose.connection;

var app = require('./app');

mongoose.connect('mongodb://@localhost:27017/foodHub', {
    useNewUrlParser: true
});


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected!');
});

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
