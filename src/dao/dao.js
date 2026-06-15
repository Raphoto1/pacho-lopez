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

// ── Posters ──────────────────────────────────────────────────────────────────

export const createPoster = async ({ filename, url, title }) => {
  try {
    const database = await connectDB();
    const collection = database.collection('posters');
    const result = await collection.insertOne({
      filename,
      url,
      title: title || '',
      createdAt: new Date(),
    });
    return result;
  } catch (error) {
    console.error('Error creating poster:', error);
    throw error;
  }
};

export const getAllPosters = async () => {
  try {
    const database = await connectDB();
    const collection = database.collection('posters');
    const posters = await collection.find({}).sort({ createdAt: -1 }).toArray();
    return posters;
  } catch (error) {
    console.error('Error getting posters:', error);
    throw error;
  }
};

export const deletePoster = async (id) => {
  try {
    const database = await connectDB();
    const collection = database.collection('posters');
    const poster = await collection.findOne({ _id: new ObjectId(id) });
    if (!poster) return null;
    await collection.deleteOne({ _id: new ObjectId(id) });
    return poster;
  } catch (error) {
    console.error('Error deleting poster:', error);
    throw error;
  }
};

// Returns all posters and removes them all from the collection
export const popAllPosters = async () => {
  try {
    const database = await connectDB();
    const collection = database.collection('posters');
    const posters = await collection.find({}).toArray();
    if (posters.length > 0) {
      await collection.deleteMany({});
    }
    return posters;
  } catch (error) {
    console.error('Error popping all posters:', error);
    throw error;
  }
};

// ── Hero Video ───────────────────────────────────────────────────────────────

export const setHeroVideo = async (url) => {
  try {
    const database = await connectDB();
    const collection = database.collection('heroVideo');

    await collection.deleteMany({});

    const result = await collection.insertOne({
      url,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return result;
  } catch (error) {
    console.error('Error setting hero video:', error);
    throw error;
  }
};

export const getHeroVideo = async () => {
  try {
    const database = await connectDB();
    const collection = database.collection('heroVideo');

    const heroVideo = await collection.find({}).sort({ createdAt: -1 }).limit(1).next();
    return heroVideo;
  } catch (error) {
    console.error('Error getting hero video:', error);
    throw error;
  }
};

export const clearHeroVideo = async () => {
  try {
    const database = await connectDB();
    const collection = database.collection('heroVideo');

    const result = await collection.deleteMany({});
    return result;
  } catch (error) {
    console.error('Error clearing hero video:', error);
    throw error;
  }
};

// ── Carousel Photos ─────────────────────────────────────────────────────────

export const createCarouselPhotosBatch = async (photos) => {
  try {
    const database = await connectDB();
    const collection = database.collection('carouselPhotos');

    if (!Array.isArray(photos) || photos.length === 0) {
      return { insertedCount: 0, insertedIds: [] };
    }

    const now = new Date();
    const docs = photos.map((photo, index) => ({
      filename: photo.filename,
      url: photo.url,
      title: photo.title || '',
      batchId: photo.batchId || null,
      position: Number.isFinite(photo.position) ? photo.position : index,
      createdAt: now,
      updatedAt: now,
    }));

    const result = await collection.insertMany(docs);
    return result;
  } catch (error) {
    console.error('Error creating carousel photos batch:', error);
    throw error;
  }
};

export const getAllCarouselPhotos = async () => {
  try {
    const database = await connectDB();
    const collection = database.collection('carouselPhotos');

    const photos = await collection
      .find({})
      .sort({ createdAt: 1, position: 1 })
      .toArray();

    return photos;
  } catch (error) {
    console.error('Error getting carousel photos:', error);
    throw error;
  }
};

export const deleteCarouselPhoto = async (id) => {
  try {
    const database = await connectDB();
    const collection = database.collection('carouselPhotos');
    const photo = await collection.findOne({ _id: new ObjectId(id) });

    if (!photo) return null;

    await collection.deleteOne({ _id: new ObjectId(id) });
    return photo;
  } catch (error) {
    console.error('Error deleting carousel photo:', error);
    throw error;
  }
};

export const popAllCarouselPhotos = async () => {
  try {
    const database = await connectDB();
    const collection = database.collection('carouselPhotos');
    const photos = await collection.find({}).toArray();

    if (photos.length > 0) {
      await collection.deleteMany({});
    }

    return photos;
  } catch (error) {
    console.error('Error clearing carousel photos:', error);
    throw error;
  }
};

export const updateCarouselPhotosOrder = async (orderedIds) => {
  try {
    const database = await connectDB();
    const collection = database.collection('carouselPhotos');

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return { modifiedCount: 0 };
    }

    const operations = orderedIds.map((id, index) => ({
      updateOne: {
        filter: { _id: new ObjectId(id) },
        update: {
          $set: {
            position: index,
            updatedAt: new Date(),
          },
        },
      },
    }));

    const result = await collection.bulkWrite(operations, { ordered: true });
    return result;
  } catch (error) {
    console.error('Error updating carousel photos order:', error);
    throw error;
  }
};