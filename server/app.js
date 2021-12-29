const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// routes
const driverRouter = require('./routes/driverRoutes');

//midellware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})


app.use('/driver', driverRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});