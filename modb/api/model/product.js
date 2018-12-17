var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var db = require('./db.js')

var ProductSchema = new Schema({
	title   		: { type: String, 	default: '' },
	cover   		: { type: String, 	default: '' },
	images  		: { type: Array, 	default: '' },
	current_price 	: { type: Number, 	default: '' },
	low_price 		: { type: Number,	default: 0 },
	pay_num 		: { type: Number, 	default: Date.now },
	keys   			: { type: Array, 	default: Date.now },
	stock    		: { type: Number, 	default: 0 },
	status   		: { type: Number,	default: [] },
	time  			: { type: Object, 	default: {} },
	details 		: { type: Object, 	default: [] },
	others 			: { type: Array, 	default: [] },
}, {collection: 'product'});
//创建Model
var ProductModel = db.model("product", ProductSchema );
module.exports = ProductModel