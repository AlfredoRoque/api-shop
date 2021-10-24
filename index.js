const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

//settings
app.set('port', process.env.PORT || 3000); 

//middlewares
app.use(express.json());

//Routes
app.use(require('./src/routes/shop'));

app.listen(app.get('port'),()=>{
    console.log("listen on port "+app.get('port'));
});