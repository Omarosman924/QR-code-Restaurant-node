const mongoose = require('mongoose');
const { Table, MenuItem, Order } = require('./mongoschema.js');

// mongoose.connect('mongodb://192.168.1.101/restaurant', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

async function seed() {
  try {
    await Table.deleteMany({});
    await MenuItem.deleteMany({});
    await Order.deleteMany({});

    const table1 = await new Table({ qr_code_url: 'http://localhost:3000/1' }).save();
    const table2 = await new Table({ qr_code_url: 'http://localhost:3000/2' }).save();

    const burger = await new MenuItem({ name: 'Burger', price: 10.99, category: 'Food' }).save();
    const pizza = await new MenuItem({ name: 'Pizza', price: 15.49, category: 'Food' }).save();
    const soda = await new MenuItem({ name: 'Soda', price: 3.5, category: 'Drinks' }).save();

 



    console.log('Seeding complete.');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
