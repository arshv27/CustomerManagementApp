import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyAxQUnLmtEsgUzZhTLJMSZ_6qwXigezChU',
    authDomain: 'shop-app-77d6d.firebaseapp.com',
    databaseURL: 'https://shop-app-77d6d.firebaseio.com',
    projectId: 'shop-app-77d6d',
    storageBucket: 'shop-app-77d6d.appspot.com/files',
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);
Firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default Firebase