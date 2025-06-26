const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const { Table, MenuItem, Order, User } = require('./mongoschema.js');

const app = express();
const PORT = process.env.PORT || 3000;

// Auto-create admin user
(async () => {
  const existingAdmin = await User.findOne({ username: 'admin' });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('123', 12);
    await User.create({ username: 'admin', password: hashedPassword });
    console.log('✅ Admin user created: username = admin, password = 123');
  }
})();

// Auth middleware
function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'mysecretkey',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    return res.redirect('/dashboard');
  }
  res.redirect('/login');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

app.get('/dashboard', isAuthenticated, async (req, res) => {
  const items = await MenuItem.find();
  res.render('dashboard', { items });
});

app.post('/dashboard/add', isAuthenticated, async (req, res) => {
  const { name, price } = req.body;
  await MenuItem.create({ name, price });
  res.redirect('/dashboard');
});

app.post('/dashboard/edit/:id', isAuthenticated, async (req, res) => {
  const { name, price } = req.body;
  await MenuItem.findByIdAndUpdate(req.params.id, { name, price });
  res.redirect('/dashboard');
});

app.post('/dashboard/delete/:id', isAuthenticated, async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.redirect('/dashboard');
});

// Main page (tables)
app.get('/', async (req, res) => {
  const tables = await Table.find();
  res.render('index', { tables });
});

// Menu and ordering
app.route('/menu/:table_id')
  .get(async (req, res) => {
    const menuItems = await MenuItem.find();
    res.render('menu', { menuItems, table_id: req.params.table_id });
  })
  .post(async (req, res) => {
    const { quantities, prices, names } = req.body;
    const orderItems = Object.keys(quantities).map(item_id => {
      const quantity = parseInt(quantities[item_id], 10);
      const price = parseFloat(prices[item_id]);
      const name = names[item_id];
      return { item_id, quantity, price: price * quantity, name };
    }).filter(item => item.quantity > 0);

    const total_price = orderItems.reduce((acc, item) => acc + item.price, 0);
    const new_order = new Order({
      table_id: req.params.table_id,
      order: orderItems,
      total_price
    });
    await new_order.save();
    res.redirect(`/menu/${req.params.table_id}`);
  });

// View orders
app.get('/order', async (req, res) => {
  const orders = await Order.find();
  res.render('order', { orders });
});

// Mark order as done
app.post('/:order_id/done', async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.order_id, { status_order: "done" });
    res.redirect("/order");
  } catch (err) {
    console.error(err);
    res.redirect("/order");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
