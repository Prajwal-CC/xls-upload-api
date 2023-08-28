var express = require('express');
var router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Member List', results: [], messages: { success: true } });
});
// router.post('/', function (req, res) { res.send("done here") })
router.post('/upload', upload.single('file'), (req, res) => {

  const fileBuffer = req.file.buffer;
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = xlsx.utils.sheet_to_json(sheet);
  // res.json(jsonData);
  res.render('index', { title: 'Member List', results: jsonData, messages: { success: true } });
});


module.exports = router;
