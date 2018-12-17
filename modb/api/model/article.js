var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = require('./db.js')

var ArticleSchema = new Schema({
	title   : { type: String, 	default: '' },
	cover   : { type: String, 	default: '' },
	desc    : { type: String, 	default: '' },
	content : { type: String, 	default: '' },
	views   : { type: Number,	default: 0 },
	utime   : { type: Date, 	default: Date.now },
	ctime   : { type: Date, 	default: Date.now },
	sort    : { type: Number, 	default: 0 },
	label   : { type: Array,	default: [] },
	author  : { type: String, 	default: '' },
	comment : { type: Array, 	default: [] },
}, {collection: 'article'});
//创建Model
var ArticleModel = db.model("article", ArticleSchema );
module.exports = ArticleModel