const express = require('express');
const manufacturersController = require('./manufacturers.controller');

const router = express.Router();

router.get('/', manufacturersController.listManufacturers);
router.get('/:manufacturerId', manufacturersController.getManufacturer);
router.post('/', manufacturersController.createManufacturer);
router.put('/:manufacturerId', manufacturersController.updateManufacturer);
router.delete('/:manufacturerId', manufacturersController.deleteManufacturer);

module.exports = router;
