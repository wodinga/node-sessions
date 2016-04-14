var mongoose = require('mongoose')
var Schema = mongoose.Schema;
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/test');

var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema, 'bitcoin_user');
