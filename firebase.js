// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
//librería que permite utilizar funciones
import { addDoc, collection, deleteDoc, doc, getDoc,getDocs, getFirestore, onSnapshot,updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"
// DOCUMENTACIÓN:
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgVAbnycHSNXDQazjF6YkhVyFAgRx6zw4",
  authDomain: "evalucaion.firebaseapp.com",
  projectId: "evalucaion",
  storageBucket: "evalucaion.appspot.com",
  messagingSenderId: "550014484307",
  appId: "1:550014484307:web:21281d46a4817bf94f6ba6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase

const db = getFirestore(app);

//función para listar todos los registros
export const getData = (data) => {
    
    onSnapshot(collection(db, 'IGN'), data)
}

//función eliminar 
export const eliminar = (id) =>{
   
    deleteDoc(doc(db,'IGN',id))
}

export const obtener = (id) => getDoc(doc(db,'IGN',id))

export const update = (id,reseña) =>{
    
    updateDoc(doc(db,'IGN',id),reseña)
}

export const anadir = async (rese) => {
    const q = query(collection(db, 'IGN'), where("juego", "==", rese.juego));
  //para que el dato de nombre de juego no se repita
    const querySnapshot = await getDocs(q);
  
    if (querySnapshot.empty) {
      await addDoc(collection(db, 'IGN'), rese);
      return true;
    } else {
      return false;
    }
}