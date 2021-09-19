import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import * as express from "express";
import * as cors from "express";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
const serviceAccount = require("../src/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({
    mensaje: "Hello from Firebase!!",
  });
});

export const getGOTY = functions.https.onRequest(async (request, response) => {
  // const nombre = request.query.nombre || 'Nombre no disponible';
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map( (doc) => doc.data() );
  response.json( juegos );
});

// Express
const app = express();
app.use(cors());

app.get("/goty", async (req, res) => {
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map( (doc) => doc.data() );
  res.json( juegos );
});

export const api = functions.https.onRequest( app );
