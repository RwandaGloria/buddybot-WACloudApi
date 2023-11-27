const { MongoClient } = require('mongodb');
require('dotenv').config();

// Connection URI for your MongoDB server
const uri = process.env.MONGODB_KEY; // Replace with your MongoDB server URL

// Database and collection names
const dbName = 'test'; // Replace with your database name
const collectionName = 'businessprices'; // Replace with your collection name

// Your original dataset
const originalDataset = [
  { priceName: 'nin_mobile_500mb', priceValue: 120 },
];

// Add N20 to each price value
const updatedDataset = originalDataset.map((item) => ({
  ...item,
  priceValue: item.priceValue + 30,
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
