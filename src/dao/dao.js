import { MongoClient, ObjectId } from 'mongodb';

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

export const createEventDate = async (eventData) => {
  try {
    const database = await connectDB();
    const collection = database.collection('eventDates');
    const { lugar, fecha, ciudad, cartel, soldOut, buyLink } = eventData;

    const result = await collection.insertOne({
      lugar,
      fecha,
      ciudad,
      ...(cartel !== undefined && { cartel }),
      ...(buyLink !== undefined && buyLink && { buyLink }),
      soldOut: Boolean(soldOut),
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return result;
  } catch (error) {
    console.error('Error creating event date:', error);
    throw error;
  }
};

export const getAllEventDates = async () => {
  try {
    const database = await connectDB();
    const collection = database.collection('eventDates');
    const eventDates = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return eventDates;
  } catch (error) {
    console.error('Error getting event dates:', error);
    throw error;
  }
};

export const getEventDateById = async (id) => {
  try {
    const database = await connectDB();
    const collection = database.collection('eventDates');
    const eventDate = await collection.findOne({ _id: new ObjectId(id) });
    return eventDate;
  } catch (error) {
    console.error('Error getting event date by id:', error);
    throw error;
  }
};

export const updateEventDate = async (id, eventData) => {
  try {
    const database = await connectDB();
    const collection = database.collection('eventDates');
    const { lugar, fecha, ciudad, cartel, soldOut, buyLink } = eventData;

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...(lugar !== undefined && { lugar }),
          ...(fecha !== undefined && { fecha }),
          ...(ciudad !== undefined && { ciudad }),
          ...(cartel !== undefined && { cartel }),
          ...(buyLink !== undefined && { buyLink }),
          ...(soldOut !== undefined && { soldOut: Boolean(soldOut) }),
          updatedAt: new Date()
        }
      }
    );

    return result;
  } catch (error) {
    console.error('Error updating event date:', error);
    throw error;
  }
};

export const deleteEventDate = async (id) => {
  try {
    const database = await connectDB();
    const collection = database.collection('eventDates');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Error deleting event date:', error);
    throw error;
  }
};