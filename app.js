const express = require('express');
const multer = require('multer');
const app = express();
const path = require('path');
const { v4 } = require('uuid');

app.use(express.static(path.join(__dirname,'./file')));

app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', "*");
	res.header('Access-Control-Allow-Headers', "*");
	next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './file/');
    },
    filename: function(req, file, cb) {
        cb(null, `${v4()}.${file.originalname.split('.')[1]}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 10 }, // 限制上传文件大小为10MB
});

app.post('/api/upload', upload.array('file', 5), (req, res) => {
    // console.log(req);
    res.send(req.files);    
})


app.listen(20004, () => {
    console.log('server running!');
})