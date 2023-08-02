const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./creds.json");
const { FieldPath } = require("firebase-admin").firestore;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var cors = require("cors");

const app = express();
const db = admin.firestore();

const port = 8080;

app.listen(port, () => {
  console.log(`Le serveur écoute sur le port ${port}`);
});

app.use(cors());

app.unsubscribe(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const questions = await db.collection("myBook").get();
    const questionsArray = questions.docs.map((question) => {
      const data = question.data();
      return { id: question.id, ...data };
    });
    res.status(200).send(questionsArray);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

let pageNumber = 0;
const loadLastPageNumber = async () => {
  try {
    const res = await db.collection("myBook").get();
    pageNumber = res.size;
  } catch (error) {
    console.error("Erreur lors du chargement de pageNumber :", error);
  }
};

loadLastPageNumber();

app.post("/", async (req, res) => {
  try {
    const content = req.body.content;
    pageNumber++;
    await db.collection("myBook").doc(pageNumber.toString()).set({
      content: content,
    });
    res.status(200).send({ page: pageNumber });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la page :", error);
    res.status(500).send("Une erreur est survenue lors de l'ajout de la page.");
  }
});


