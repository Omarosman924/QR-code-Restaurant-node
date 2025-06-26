const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const bcrypt = require('bcrypt');
const { Table, MenuItem, Order } = require('./mongoschema.js');
const { name } = require('ejs');

const app = express();
const PORT = process.env.PORT || 3000;


function getFirst20Chars(text) {
  const fullText = Array.isArray(text) ? text.join(' ') : text;
  return fullText.length <= 75 ? fullText : fullText.slice(0, 75) + '...';
}

// Middleware for checking login
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.status(401).send('🔒 Unauthorized – Please login first');
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

app.route("/")
.get(async(req,res)=>{
  const tables = await Table.find()

  console.log(tables)
  res.render("index.ejs",{tables:tables})
})

// Routes
app.route('/menu/:table_id')
  .get(async(req,res)=>{
    try {
      const menuItems = await MenuItem.find()
      res.render('menu.ejs',{menuItems: menuItems ,  table_id: req.params.table_id})


    }
     catch(err){
      res.status(500).json({ error: 'Error while fetching news' });
     }
  })
.post(async (req, res) => {
  const { quantities, prices , names } = req.body;
  console.log(name)

  const orderItems = Object.keys(quantities).map(item_id => {
    const quantity = parseInt(quantities[item_id], 10);
    const price = parseFloat(prices[item_id]);
    const name = names[item_id];

    return {
      item_id,
      quantity,
      price: price * quantity ,
      name: name
    };
  }).filter(item => item.quantity > 0); 
  const total_price = Object.values(orderItems).map(item => item.price).reduce((acc,curr) => acc + curr ,0);
  const new_order = new Order({
    table_id: req.params.table_id,
    order: orderItems,
    total_price
  })
  await new_order.save()


  res.redirect(`/menu/${req.params.table_id}`);
});

app.route('/order')
  .get(async(req , res)=>{
    orders = await Order.find()
    

    res.render("order.ejs",{oarders: orders})
  })

app.route('/:order_id/done')
  .post(async(req,res)=>{
    const orderID = req.params.order_id 
    try{
    await Order.findByIdAndUpdate(orderID,{status_order: "done"})
    res.redirect("/order")
    }
    catch(err){
      console.log(err)
      res.redirect("/order")

    }
  })





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
