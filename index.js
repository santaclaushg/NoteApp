const express = require(`express`);
const bodyParser = require(`body-parser`);


const app = express();
const parser = bodyParser.urlencoded({extended: false});
app.use(express.static(`public`));
app.set(`./views`, `views`);
app.set(`view engine`, `ejs`);
app.listen(3000);

var arr = ["Android", "iOS", "PHP", "React", "Angular", "NodeJS", "ExpressJS"];

app.get(`/`, (req, res) => {
  res.render(`homepage`);
});
app.post(`/getNotes`, (req, res) => {
  res.send(arr);
});
app.post(`/add`, parser, (req, res) => {
  var newNote = req.body.note;
  arr.push(newNote);
  res.send(arr);
});
app.post(`/delete`, parser, (req, res) => {
  var id = req.body.idDelete;
  arr.splice(id, 1);
  res.send(arr);
});
app.post(`/update`, parser, (req, res) => {
  var id = req.body.idEdit;
  arr[id] = req.body.contentEdit;
  res.send(arr);
});