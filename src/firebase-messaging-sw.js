importScripts('./assets/js/firebase-app-3.9.0.min.js');
importScripts('./assets/js/firebase-messaging-3.9.0.min.js');


firebase.initializeApp({
    'messagingSenderId': '983418984510'
});


const messaging = firebase.messaging();