const express = require('express');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));


// Routes to render the pages
app.get('/', (req, res) => {
    res.render('index');
});

const PORT = 3000
app.listen(PORT, () => {
    console.log('server is running on port 3000');
})

export default app;