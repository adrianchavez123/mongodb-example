const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const insertDocuments = (db,callback) => {
  //Get reference to edx-course-docs collection
  const collection = db.collection('edx-course-students');
  //Insert 3 documents
  collection.insert([
    { name : 'Bob'},
    { name : 'John'},
    { name : 'Peter'}
  ], (err,result)=>{
    if(err) return process.exit(1);
    console.log(result.result.n); //will be 3
    console.log(result.ops.length); //will be 3
    console.log('Inserted 3 documents into the edx-course-students collection');
    callback(result);
  });
};

const updateDocument = (db,callback) => {
  //Get the edx-course-students collection
  var collection = db.collection('edx-course-students');
  const name = 'Peter';
  collection.update({ name : name},{ $set : {grade : 'A'} }, (err,result) =>{
    if(err) return process.exit(1);
    console.log(result.result.n); //will be 1
    console.log(`Update the student document where name = ${name}`);
    callback(result);
  });
};

const removeDocument = (db, callback) =>{
  // Get the documents collection
  const collection = db.collection('edx-course-students');
  // Insert some documents
  const name = 'Bob';
  collection.remove({name : name}, (err, result) =>{
    if(err) return process.exit(1);
    console.log(result.result.n); //will be 1
    console.log(`Removed the document where name = ${name}`);
    callback(result);
  });
};

const findDocuments = (db, callback) =>{
  // Get the documents collection
  var collection =  db.collection('edx-course-students');
  // Find some documents
  collection.find({}).toArray((err,docs)=>{
    if(err) return process.exit(1);
    console.log(2,docs.length); // will be 2 because we removed one document
    console.log(`Found the following documents:`);
    console.dir(docs);
    callback(docs);
  });
}
//Connection URI
const url = 'mongodb://localhost:27017/edx-course-db';
//Use connect method to connect to the Server
MongoClient.connect(url, (err,db) => {
  if(err) return process.exit(1);
  console.log('Kudos. Connected successfully to server');
  //Perform queries
  insertDocuments(db, result => {
    updateDocument(db, result =>{
      removeDocument(db, result =>{
        findDocuments(db, result =>{
          db.close();
        });
      });
    });

  });
  //db.close();
})
