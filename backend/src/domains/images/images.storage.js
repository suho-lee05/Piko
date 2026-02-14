const supabase = require('../../config/supabase');

function getBucketName() {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET;
  if (!bucket) {
    throw new Error('SUPABASE_STORAGE_BUCKET is missing in environment');
  }
  return bucket;
}

async function uploadBuffer({ path, buffer, contentType }) {
  const bucket = getBucketName();

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType,
      upsert: false,
    });

  if (error) throw error;
  return data;
}

async function deleteByPath(path) {
  const bucket = getBucketName();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

function getPublicUrlForPath(path) {
  const bucket = getBucketName();
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || null;
}

function extractPathFromUrl(url) {
  const bucket = process.env.SUPABASE_STORAGE_BUCKET;
  if (!url || !bucket) return null;

  const marker = `/storage/v1/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  if (index === -1) return null;
  return url.slice(index + marker.length) || null;
}

module.exports = {
  uploadBuffer,
  deleteByPath,
  getPublicUrlForPath,
  extractPathFromUrl,
};
