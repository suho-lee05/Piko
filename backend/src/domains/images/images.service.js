const supabase = require('../../config/supabase');

const IMAGE_FIELDS = 'imageid, postid, imageurl, imagetype, sortorder, createdat';

async function listImages(filters) {
  let query = supabase.from('images').select(IMAGE_FIELDS);
  if (filters.postId) query = query.eq('postid', filters.postId);
  query = query.order('sortorder', { ascending: true }).order('createdat', {
    ascending: false,
  });

  const { data, error } = await query;
  return { data, error };
}

async function getImageById(imageId) {
  const { data, error } = await supabase
    .from('images')
    .select(IMAGE_FIELDS)
    .eq('imageid', imageId)
    .maybeSingle();

  return { data, error };
}

async function createImage(payload) {
  const { data, error } = await supabase
    .from('images')
    .insert([payload])
    .select(IMAGE_FIELDS)
    .single();

  return { data, error };
}

async function deleteImage(imageId) {
  const { data, error } = await supabase
    .from('images')
    .delete()
    .eq('imageid', imageId)
    .select(IMAGE_FIELDS)
    .single();

  return { data, error };
}

module.exports = {
  listImages,
  getImageById,
  createImage,
  deleteImage,
};
