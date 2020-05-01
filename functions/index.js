const functions = require('firebase-functions');
const admin = require("firebase-admin");

const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore()


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

admin.initializeApp(functions.config().firebase)

exports.onUserStatusChanged = functions.database
    .ref('/status/{userId}')
    .onUpdate((change, context)=>{
        const usersRef = firestore.collection('/users')        
        const roomsRef = firestore.collection('rooms')
        const room_name = change.before.val().room

        return change.after.ref.once('value')
            .then(statusSnapshot => change.after.val())
            .then(status => {
                if (status.status === 'offline') {
                    usersRef
                        .doc(context.params.userId)
                        .set({
                            online: false,
                            room: null
                        }, {merge: true})

                    roomsRef.doc(room_name).update({players: admin.firestore.FieldValue.arrayRemove(context.params.userId)})
                }
            })
            .catch(err=>console.log(err.message))
    })

    