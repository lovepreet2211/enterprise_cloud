const MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
fs.readFile('lovepreet.json', function (err, data) {
   if (err) throw err;
   let newData = JSON.parse(data);

   const uri = "mongodb+srv://kaneki:RWgwWHgCEgeaJ5or@cluster0-ktdm9.mongodb.net/test?retryWrites=true&w=majority"
   MongoClient.connect(uri, {
      useUnifiedTopology: true
   }, function (err, client) {
      if (err) {
         console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
      }
      console.log('Connected...');
      let collection = client.db("project").collection("c0741641_customers");
      collection.insertMany(newData, function (err, res) {
         if (err) throw err;
         console.log('Collections Inserted');
      })
      collection.findOne({}, function (err, res) {
         if(err) throw err;
         console.log(res);
        })
      var oldValue = { 'model' : 'Tucson' };
      var newValue = { $set : { 'model': 'Tucson-EV' } };
      collection.updateOne(oldValue, newValue, (err) => {
         if(err) throw err;
         console.log("Updated");
      });
      client.close();
   });

})