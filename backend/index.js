const express = require("express");
const rootrouter = require('./routes/index');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/api/v1',rootrouter)

app.listen(3000)


