function hello(){
window.alert("hello world");
console.log("something happens");
}

let db;
let dbReq = indexedDB.open('myDatabase', 1);dbReq.onupgradeneeded = function(event) {
  // Set the db variable to our database so we can use it!
  db = event.target.result;

  // Create an object store named notes. Object stores
  // in databases are where data are stored.
  let notes = db.createObjectStore('notes', {autoIncrement: true});
}dbReq.onsuccess = function(event) {
  db = event.target.result;
}dbReq.onerror = function(event) {
  alert('error opening database ' + event.target.errorCode);
}