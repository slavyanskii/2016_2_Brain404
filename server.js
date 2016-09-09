let express = require('express');
let technologger = require('technologger');
let parser = require('body-parser');
let app = express();
let emailObj = {};

app.use('/', express.static('public'));

app.use(parser.json());
app.use(technologger);

app.post('/users', (req, res) => {
    console.log(req.body);
    res.send(String(emailCount(req.body.email)));
    // TODO: вернуть количество обращений
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`App started on port ${process.env.PORT || 3000}`);
});

function emailCount(email) {
  if (emailObj[email] >= 1) {
    emailObj[email]++;
  }  else {
    emailObj[email] = 1;
  }
  return emailObj[email];
}
