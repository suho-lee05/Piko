const manufacturersService = require('./manufacturers.service');

function sanitizeManufacturer(item) {
  return {
    manufacturerid: item.manufacturerid,
    manufacturername: item.manufacturername,
    phonenumber: item.phonenumber,
    address: item.address,
    contactperson: item.contactperson,
    createdat: item.createdat,
  };
}

async function listManufacturers(req, res) {
  const { data, error } = await manufacturersService.listManufacturers();
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch manufacturers',
      details: error.message,
    });
  }

  const items = Array.isArray(data) ? data.map(sanitizeManufacturer) : [];
  return res.status(200).json({ status: 'OK', items });
}

async function getManufacturer(req, res) {
  const { manufacturerId } = req.params;

  const { data, error } = await manufacturersService.getManufacturerById(
    manufacturerId
  );
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch manufacturer',
      details: error.message,
    });
  }
  if (!data) {
    return res.status(404).json({
      status: 'ERROR',
      message: 'Manufacturer not found',
    });
  }

  return res.status(200).json({
    status: 'OK',
    manufacturer: sanitizeManufacturer(data),
  });
}

async function createManufacturer(req, res) {
  const { manufacturerName, phoneNumber, address, contactPerson } = req.body || {};

  if (!manufacturerName) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'manufacturerName is required',
    });
  }

  const payload = {
    manufacturername: manufacturerName,
    phonenumber: phoneNumber || null,
    address: address || null,
    contactperson: contactPerson || null,
    createdat: new Date().toISOString(),
  };

  const { data, error } = await manufacturersService.createManufacturer(payload);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to create manufacturer',
      details: error.message,
    });
  }

  return res.status(201).json({
    status: 'OK',
    manufacturer: sanitizeManufacturer(data),
  });
}

async function updateManufacturer(req, res) {
  const { manufacturerId } = req.params;
  const { manufacturerName, phoneNumber, address, contactPerson } = req.body || {};

  const payload = {};
  if (manufacturerName !== undefined) payload.manufacturername = manufacturerName;
  if (phoneNumber !== undefined) payload.phonenumber = phoneNumber;
  if (address !== undefined) payload.address = address;
  if (contactPerson !== undefined) payload.contactperson = contactPerson;

  if (Object.keys(payload).length === 0) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'No fields to update',
    });
  }

  const { data, error } = await manufacturersService.updateManufacturer(
    manufacturerId,
    payload
  );
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to update manufacturer',
      details: error.message,
    });
  }

  return res.status(200).json({
    status: 'OK',
    manufacturer: sanitizeManufacturer(data),
  });
}

async function deleteManufacturer(req, res) {
  const { manufacturerId } = req.params;

  const { data, error } = await manufacturersService.deleteManufacturer(
    manufacturerId
  );
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to delete manufacturer',
      details: error.message,
    });
  }

  return res.status(200).json({
    status: 'OK',
    manufacturer: sanitizeManufacturer(data),
  });
}

module.exports = {
  listManufacturers,
  getManufacturer,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
};
