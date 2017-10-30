const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var CryptoJS = require('crypto-js');
var soap = require('soap');




const encryptacion_key = 'F4EVJ7KB2P21O1G9NYR2T4RC';
const commerce_key = 'd68e0fb347d5bd3e3425214b7f5b2832068c87f7a522b5366acda48d5b8a9aa70ece91955a94a6957691eaa1f8e5b7dbe6d842a53ccfebc5e5c9f6d7305178d2';
const url_tigo = 'http://190.129.208.178:96/PasarelaServices/CustomerServices?wsdl';


const NODE_PAYMENTS = 'payments';
const NODE_CARTS = 'carts';
exports.paymentCart = functions.database.ref(NODE_PAYMENTS + '/{paymentID}').onCreate(event => {
    const paymentID = event.params.paymentID;
    const paymentData = event.data.val();

    var data = 'pv_nroDocumento=' + paymentData.pv_nroDocumento + ';pv_orderId=' + paymentData.pv_orderId + ';pv_mensaje=' + paymentData.pv_mensaje + ';pv_monto=' + paymentData.pv_monto + ';pv_linea=' + paymentData.pv_linea + ';pv_nombre=' + paymentData.pv_nombre + ';pv_urlCorrecto=;pv_urlError=;pv_confirmacion=' + paymentData.pv_confirmacion + ';pv_notificacion=' + paymentData.pv_notificacion + ';pv_items=' + paymentData.pv_items + ';pv_razonSocial=' + paymentData.pv_razonSocial + ';pv_nit=' + paymentData.pv_nit;
    console.log(data);
    data = encryptByDES(data, encryptacion_key);
    var args = {
        key: commerce_key,
        parametros: data
    }
    return soap.createClient(url_tigo, function(err, client) {
        client.solicitarPago(args, function(err, result) {
            console.log(result);
        });
    });
});







function encryptByDES(content, encriptation_key) {
    var keyHex = CryptoJS.enc.Utf8.parse(encriptation_key);
    var encrypted = CryptoJS.TripleDES.encrypt(content, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}


function decryptByDES(content, encriptation_key) {
    var keyHex = CryptoJS.enc.Utf8.parse(encriptation_key);
    var decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(message)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.ZeroPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}








/*

///https://comprastarija.online/arqueo


exports.miurl = functions.https.onRequest((req, res) => {

    const key = 'v2gob0tdyCWn8WIGkpXOOy56LiD2';
    console.log(admin.database().ref('/users/' + key));

    return res.status(200).send('funiona');
});
*/





/*


exports.sendNotification = functions.database.ref('/notifications/{notId}').onWrite(event => {
    const data = event.data.val();
    const payload = {
        data: {
            title: data.title,
            body: data.body,
            score: "850",
            time: "2:45"
        }
    };
    return admin.messaging().sendToTopic(data.topic, payload).then(function(response) {
            console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
            console.log("Error sending message:", error);
        });
});


*/







/*

const moment = require('moment');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

const mkdirp = require('mkdirp-promise');

const bolivia_timezone = 4;

//FUNCIONES PARA BASE DE DATOS


//INICIO DE FUNCIONES PARA EL NODO USUARIOS///
const USERS_NODE = 'users';
exports.CreateUser = functions.database.ref(USERS_NODE + '/{userID}').onCreate(event => {
    const userID = event.params.userID;

    let userData = event.data.val();

    userData.date = {};
    userData.date['created_at'] = moment(event.timestamp).subtract(bolivia_timezone, 'hours');
    userData.date['udpated_at'] = moment(event.timestamp).subtract(bolivia_timezone, 'hours');
    userData.state = true;


    admin.auth().createUser({
            email: userData.email,
            emailVerified: false,
            password: userData.phoneNumber,
            displayName: userData.displayName,
            photoURL: "",
            disabled: false
        })
        .then(function(userRecord) {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
        })
        .catch(function(error) {
            console.log("Error creating new user:", error);
        });





    return event.data.ref.parent.child('/' + userID).set(userData);
});


//FIN DE FUNCIONES PARA EL NODO USUARIOS//

//FIN DE FUNCIONES PARA BASE DE DATOS


//FUNCIONES PARA STORAGE

const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;

const THUMB_PREFIX = 'thumb_';



exports.generateThumbnail = functions.storage.object().onChange(event => {

    const filePath = event.data.name;
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath);
    const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
    const tempLocalFile = path.join(os.tmpdir(), filePath);
    const tempLocalDir = path.dirname(tempLocalFile);
    const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

    if (!event.data.contentType.startsWith('image/')) {
        console.log('This is not an image.');
        return;
    }

    if (fileName.startsWith(THUMB_PREFIX)) {
        console.log('Already a Thumbnail.');
        return;
    }

    if (event.data.resourceState === 'not_exists') {
        console.log('This is a deletion event.');
        return;
    }

    const bucket = gcs.bucket(event.data.bucket);
    const file = bucket.file(filePath);
    const thumbFile = bucket.file(thumbFilePath);

    return mkdirp(tempLocalDir).then(() => {
        return file.download({ destination: tempLocalFile });
    }).then(() => {
        console.log('The file has been downloaded to', tempLocalFile);
        return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile]);
    }).then(() => {
        console.log('Thumbnail created at', tempLocalThumbFile);
        return bucket.upload(tempLocalThumbFile, { destination: thumbFilePath });
    }).then(() => {
        console.log('Thumbnail uploaded to Storage at', thumbFilePath);
        fs.unlinkSync(tempLocalFile);
        fs.unlinkSync(tempLocalThumbFile);
        const config = {
            action: 'read',
            expires: '03-01-2500'
        };
        return Promise.all([
            thumbFile.getSignedUrl(config),
            file.getSignedUrl(config)
        ]);
    }).then(results => {
        console.log('Got Signed URLs.');
        const thumbResult = results[0];
        const originalResult = results[1];
        const thumbFileUrl = thumbResult[0];
        const fileUrl = originalResult[0];
        return admin.database().ref('images').push({ path: fileUrl, thumbnail: thumbFileUrl });
    }).then(() => console.log('Thumbnail URLs saved to database.'));
});


//FIN STORAGE



// cloud functions para auth


const nodemailer = require('nodemailer');

const gmailEmail = 'montellanosdev@gmail.com';
const gmailPassword = 'Montellanos22';
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendEmailNewUser = functions.auth.user().onCreate(event => {
    const email_to = 'jorgemontellanos@gmail.com';
    console.log(event.data);
    const mailOptions = {
        from: '"Admin mio." <noreply@firebase.com>',
        to: email_to
    };
    mailOptions.subject = 'Bienviednido';
    mailOptions.text = 'que seas bienvienido a la plataforma';
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New unsubscription confirmation email sent to:', email_to);
    }).catch(error => {
        console.error('There was an error while sending the email:', error);
    });

});*/