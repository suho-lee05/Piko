const supabase = require('../../config/supabase');

const MANUFACTURER_FIELDS =
  'manufacturerid, manufacturername, phonenumber, address, contactperson, createdat';

async function listManufacturers() {
  const { data, error } = await supabase
    .from('manufacturers')
    .select(MANUFACTURER_FIELDS)
    .order('createdat', { ascending: false });

  return { data, error };
}

async function getManufacturerById(manufacturerId) {
  const { data, error } = await supabase
    .from('manufacturers')
    .select(MANUFACTURER_FIELDS)
    .eq('manufacturerid', manufacturerId)
    .maybeSingle();

  return { data, error };
}

async function createManufacturer(payload) {
  const { data, error } = await supabase
    .from('manufacturers')
    .insert([payload])
    .select(MANUFACTURER_FIELDS)
    .single();

  return { data, error };
}

async function updateManufacturer(manufacturerId, payload) {
  const { data, error } = await supabase
    .from('manufacturers')
    .update(payload)
    .eq('manufacturerid', manufacturerId)
    .select(MANUFACTURER_FIELDS)
    .single();

  return { data, error };
}

async function deleteManufacturer(manufacturerId) {
  const { data, error } = await supabase
    .from('manufacturers')
    .delete()
    .eq('manufacturerid', manufacturerId)
    .select(MANUFACTURER_FIELDS)
    .single();

  return { data, error };
}

module.exports = {
  listManufacturers,
  getManufacturerById,
  createManufacturer,
  updateManufacturer,
  deleteManufacturer,
};
