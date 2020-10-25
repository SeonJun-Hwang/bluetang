import { auth, firestore } from 'firebase/app';
import 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import { DEFAULT_TEXT } from '~global/constants';
import { createUser } from '~global/firebase';
import { firebaseDocInfoType, firebaseDocType } from '~global/types';

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
    data: DEFAULT_TEXT,
  });
  createUser(email);
  return newUser;
};

export const getDocs = async (email: string): Promise<Array<firebaseDocType>> => {
  const db = firestore();
  const collection = db.collection(email);
  const { docs } = await collection.get();
  const result = docs.map((doc) => {
    const id: string = doc.id;
    const title: string = doc.data().title;
    const text: string = doc.data().data;
    const timestamp: firebase.firestore.Timestamp = doc.data().timestamp;
    const data = { title, text, timestamp } as firebaseDocInfoType;
    return { id, data };
  });
  return result;
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
    data: DEFAULT_TEXT,
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
