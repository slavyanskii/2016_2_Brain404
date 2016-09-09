let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();
let emailList = {};
app.use('/', express.static('public'));

app.use(parser.json());
app.use(technologger);

app.post('/users', (req, res, body) => {
    console.log(req.body);
    res.send(String(countEmail(req.body.email)));
});

function countEmail (email) {
    if (emailList[email] >= 1) {
        emailList[email]++;
    }
    else {
        emailList[email]=1;
    }
    return emailList[email];
}
app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});
