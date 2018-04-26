var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', function(err){if(err) console.log(err)});
mongoose.connection.once('open',function () {
  console.log('Connected');
  var createTestData = require('./testData')
  createTestData()
}).on('error',function (error) {
  console.log('CONNECTION ERROR:',error);
});

module.exports= mongoose;