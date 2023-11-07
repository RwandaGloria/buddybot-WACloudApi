const { MongoClient } = require('mongodb');
require("dotenv").config()

// Connection URI for your MongoDB server
const uri = process.env.MONGODB_KEY; // Replace with your MongoDB server URL

// Database and collection names
const dbName = 'test'; // Replace with your database name
const collectionName = 'regularprices'; // Replace with your collection name

// Your original dataset
const originalDataset = [
  { priceName: 'mtn_250mb_CG', priceValue: 64.00 },
  { priceName: 'mtn_500mb_CG', priceValue: 124.00 },
  { priceName: 'mtn_1gb_CG', priceValue: 235.00 },
  { priceName: 'mtn_2gb_CG', priceValue: 470.00 },
  { priceName: 'mtn_3gb_CG', priceValue: 705.00 },
  { priceName: 'mtn_5gb_CG', priceValue: 1175.00 },
  { priceName: 'mtn_10gb_CG', priceValue: 2350.00 },
  { priceName: 'mtn_15gb_CG', priceValue: 3395.00 },
];

// Add N20 to each price value
const updatedDataset = originalDataset.map((item) => ({
  ...item,
  priceValue: item.priceValue + 20,
}));

async function insertUpdatedData() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Insert each document in the updated dataset
    for (const item of updatedDataset) {
      await collection.insertOne(item);
      console.log(`Inserted: ${item.priceName}`);
    }

    console.log('Data inserted successfully.');
  } catch (err) {
    console.error('Error inserting data:', err);
  } finally {
    client.close();
  }
}

insertUpdatedData();
