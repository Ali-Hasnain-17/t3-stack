import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBx1thWaL4xtPn4NlSM5lCjDUGLB5CyxCc",
  authDomain: "videohub-48998.firebaseapp.com",
  projectId: "videohub-48998",
  storageBucket: "videohub-48998.appspot.com",
  messagingSenderId: "461137477952",
  appId: "1:461137477952:web:56aaec88f720838db6baa5",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export default app;
