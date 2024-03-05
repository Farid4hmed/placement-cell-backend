const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());



app.get('/health', (req, res) => {
    res.status(200).send('OK');
});



app.listen(7777, () => {
    console.log('Server is running on port 7777');
})