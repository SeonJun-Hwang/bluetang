import { auth, firestore } from 'firebase/app';
import 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { DEFAULT_TEXT_BASE64 } from '~global/constants';
import { createUser } from '~global/firebase';

export const getUser = () => {
  return auth().currentUser;
};

export const getEmail = () => {
  const user = auth().currentUser;
  return user ? user.email : null;
};

export const createUserTable = async (email: string, title = 'title') => {
  const db = firestore();
  const collection = db.collection(email);
  const newUser = await collection.doc('default').set({
    timestamp: new Date(),
    title,
    data: DEFAULT_TEXT_BASE64,
  });
  createUser(email);
  return newUser;
};

export const getDocs = async (email: string) => {
  const db = firestore();
  const collection = db.collection(email);
  return await collection.get();
};

export const getDocsInfo = async (email: string) => {
  const db = firestore();
  const collection = db.collection(email);
  const { docs } = await collection.get();
  return docs.map((doc) => {
    const { title } = doc.data();
    return {
      id: doc.id,
      title,
    };
  });
};

export const readData = async (email: string, id: string) => {
  const db = firestore();
  const storedData = (await db.collection(email).doc(id).get()).data();
  return storedData || {};
};

export const updateTitle = async (email: string, id: string, title: string) => {
  const db = firestore();
  const trimedTitle = title.trimLeft();
  const timestamp = new Date();
  const safeTitle = trimedTitle || 'title';
  await db.collection(email).doc(id).update({ title: safeTitle, timestamp });
  return timestamp;
};

export const updateData = async (email: string, id: string, data: string) => {
  const db = firestore();
  const timestamp = new Date();
  await db.collection(email).doc(id).update({ timestamp, data });
  return timestamp;
};

export const newDoc = async (email: string, title = 'title') => {
  const db = firestore();
  const id = uuid();
  await db.collection(email).doc(id).set({
    timestamp: new Date(),
    title,
    data: DEFAULT_TEXT_BASE64,
  });
  return { id, title };
};

export const removeDoc = async (email: string, id: string) => {
  const db = firestore();
  return db.collection(email).doc(id).delete();
};

export const updateLatestDocument = async (email: string, latestDoc: string) => {
  const db = firestore();
  return await db.collection('user').doc(email).update({ latestDoc });
};

export const getLatestDocument = async (email: string): Promise<string> => {
  const db = firestore();
  const document = await db.collection('user').doc(email).get();
  const data = document.data();
  return data!['latestDoc'];
};
