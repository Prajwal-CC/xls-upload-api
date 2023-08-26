const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => { res.send('<form method="POST" action="/upload" enctype="multipart/form-data"><input type="file" name="file" /><button type="submit">Upload</button></form>'); });

app.post('/upload', upload.single('file'), (req, res) => {
    try {
        const fileBuffer = req.file.buffer;
        const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        res.json(jsonData);
    } catch (err) {
        res.send(err)
    }
})
app.listen(4000, () => console.log("Server Started"));