const mongoose = require("mongoose");
const fs = require("fs");
const { type } = require("os");

// تحميل متغيرات البيئة من .env لو موجود
if (fs.existsSync('.env')) {
  require('dotenv').config();
}


const MONGO_URI = process.env.MONGODB_URI || "mongodb://192.168.1.101:27017/restaurant";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Table Schema
const tableSchema = new mongoose.Schema({
  qr_code_url: { type: String, required: true }
});

// MenuItem Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  is_available: { type: Boolean, default: true }
});

// OrderItem Schema
const orderSchema = new mongoose.Schema({
  table_id: {
    type : mongoose.Schema.Types.ObjectId ,
    ref: 'Table',
    required: true 
  },
  order: [
    {
      item_id: {type: mongoose.Schema.Types.ObjectId , ref: 'MenuItem', required: true},
      quantity: {type: Number , required: true},
      price: {type: Number , required: true},
      name: {type: String , required: true}

    }
  ],
  total_price: {type: Number , required: true},
  status_order: {type:String ,default:'pending'}
  
})

// Models
const Table = mongoose.model('Table', tableSchema);
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
const Order = mongoose.model('Order', orderSchema);



module.exports = {
  Table,
  MenuItem,
  Order
};
