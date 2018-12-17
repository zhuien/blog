var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = require('./db.js')

var MenuSchema = new Schema({
	name   	: { type: String, 	default: '' },
	url   	: { type: String, 	default: '' },
	pid    	: { type: String, 	default: '' },
	icon 	: { type: String, 	default: '' },
	sort   	: { type: Number,	default: 0 },
}, {collection: 'menu'});
//创建Model
var MenuModel = db.model("menu", MenuSchema );
module.exports = MenuModel