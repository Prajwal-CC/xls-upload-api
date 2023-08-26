var express = require('express');
var router = express.Router();
const app = express();

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Member List', results: [], messages: { success: true } });
  res.render('index')
});

app.set('view engine', 'ejs');

module.exports = router;
