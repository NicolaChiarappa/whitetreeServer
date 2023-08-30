const admin = require("firebase-admin");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");
const {
  applicationDefault,
  initializeApp,
  getApp,
  getApps,
} = require("firebase-admin/app");
require("dotenv").config();

const firebaseapp = initializeApp({
  credential: applicationDefault(),
});

const authapp = getAuth();
const firestore = getFirestore();

module.exports = { authapp, firestore };
