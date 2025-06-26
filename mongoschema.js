const mongoose = require("mongoose");
const fs = require("fs");

// Load environment variables from .env if exists
if (fs.existsSync('.env')) {
  require('dotenv').config();
}

// MongoDB connection
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/restaurant";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema (for staff login)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model("User", userSchema);

// Table Schema
const tableSchema = new mongoose.Schema({
  qr_code_url: { type: String, required: true }
});
const Table = mongoose.model('Table', tableSchema);

// MenuItem Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String },
  is_available: { type: Boolean, default: true }
});
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  table_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
  order: [
    {
      item_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      name: { type: String, required: true }
    }
  ],
  total_price: { type: Number, required: true },
  status_order: { type: String, default: 'pending' }
});
const Order = mongoose.model('Order', orderSchema);

// Export all models
module.exports = {
  User,
  Table,
  MenuItem,
  Order
};
