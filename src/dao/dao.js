import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export const connectDB = async () => {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME || 'pacholopez');
    console.log('Connected to MongoDB');
  }
  return db;
};

export const insertSubscription = async (subscription) => {
  try {
    const database = await connectDB();
    const collection = database.collection('newsletter_subscriptions');
    
    // Verificar si el email ya existe
    const existingSubscription = await collection.findOne({ email: subscription.email });
    if (existingSubscription) {
      throw new Error('Email already subscribed');
    }
    
    // Insertar nueva suscripción
    const result = await collection.insertOne({
      ...subscription,
      subscribedAt: new Date(),
      active: true
    });
    
    return result;
  } catch (error) {
    console.error('Error inserting subscription:', error);
    throw error;
  }
};

export const getAllSubscriptions = async () => {
  try {
    const database = await connectDB();
    const collection = database.collection('newsletter_subscriptions');
    const subscriptions = await collection.find({ active: true }).toArray();
    return subscriptions;
  } catch (error) {
    console.error('Error getting subscriptions:', error);
    throw error;
  }
};

export const unsubscribe = async (email) => {
  try {
    const database = await connectDB();
    const collection = database.collection('newsletter_subscriptions');
    const result = await collection.updateOne(
      { email: email },
      { $set: { active: false, unsubscribedAt: new Date() } }
    );
    return result;
  } catch (error) {
    console.error('Error unsubscribing:', error);
    throw error;
  }
};