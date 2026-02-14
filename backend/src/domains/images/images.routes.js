const express = require('express');
const multer = require('multer');
const imagesController = require('./images.controller');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

router.post('/upload', upload.single('file'), imagesController.uploadImage);
router.get('/', imagesController.listImages);
router.post('/', imagesController.createImage);
router.delete('/:imageId', imagesController.deleteImage);

module.exports = router;
