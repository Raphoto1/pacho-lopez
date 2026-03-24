const { MongoClient, ObjectId } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "pacholopez";

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("✓ Conectado a MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection("eventDates");

    // Datos de ejemplo con links de compra
    const sampleEvents = [
      {
        lugar: "Teatro Metropolitano",
        fecha: new Date("2025-04-15"),
        ciudad: "Bogotá",
        cartel: "/img/posters/posterWide.png",
        soldOut: false,
        buyLink: "https://boletas.ejemplo.com/evento1"
      },
      {
        lugar: "Anfiteatro Dickens",
        fecha: new Date("2025-05-20"),
        ciudad: "Medellín",
        cartel: "/img/posters/posterWide.png",
        soldOut: false,
        buyLink: "https://boletas.ejemplo.com/evento2"
      },
      {
        lugar: "Centro de Convenciones",
        fecha: new Date("2025-06-10"),
        ciudad: "Cali",
        cartel: "/img/posters/posterWide.png",
        soldOut: false,
        buyLink: "https://boletas.ejemplo.com/evento3"
      },
      {
        lugar: "Estadio Atanasio Girardot",
        fecha: new Date("2025-07-25"),
        ciudad: "Medellín",
        cartel: "/img/posters/posterWide.png",
        soldOut: false,
        buyLink: "https://boletas.ejemplo.com/evento4"
      }
    ];

    // Opción 1: Reemplazar todos los eventos (descomentar si lo deseas)
    // await collection.deleteMany({});
    // const result = await collection.insertMany(sampleEvents);
    // console.log(`✓ ${result.insertedCount} eventos creados`);

    // Opción 2: Actualizar eventos existentes con buyLink
    const existingEvents = await collection.find({}).toArray();
    console.log(`\nEventos existentes: ${existingEvents.length}`);

    if (existingEvents.length === 0) {
      const result = await collection.insertMany(sampleEvents);
      console.log(`✓ ${result.insertedCount} eventos de ejemplo creados\n`);
    } else {
      console.log("\nEventos actuales en la BD:");
      existingEvents.forEach((event, idx) => {
        console.log(`\n${idx + 1}. ${event.lugar} (${event.ciudad})`);
        console.log(`   Fecha: ${event.fecha.toISOString().split("T")[0]}`);
        console.log(`   Link: ${event.buyLink || "SIN LINK"}`);
        console.log(`   Agotado: ${event.soldOut ? "Sí" : "No"}`);
      });
    }

    console.log("\n→ Usa el panel /admin para agregar o editar eventos con sus links de compra");

  } catch (error) {
    console.error("✗ Error:", error.message);
  } finally {
    await client.close();
    console.log("\n✓ Desconectado de MongoDB");
  }
}

seedDatabase();
