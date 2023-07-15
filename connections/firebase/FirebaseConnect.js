/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: establish Mysql Connection.
*/
// establish Firebase Connection.


function FirebaseConnect() {

  this.firebase = require("firebase-admin");
  this.serviceAccount = require("xxxxxx");

  this.firebase.initializeApp({
    credential: this.firebase.credential.cert(this.serviceAccount),
    databaseURL: "xxxxxx"
  });

}

module.exports = new FirebaseConnect();