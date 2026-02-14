const imagesService = require('./images.service');
const storage = require('./images.storage');

function parseNumber(value) {
  if (value === undefined || value === null || value === '') return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

function sanitizeImage(image) {
  return {
    imageid: image.imageid,
    postid: image.postid,
    imageurl: image.imageurl,
    imagetype: image.imagetype,
    sortorder: image.sortorder,
    createdat: image.createdat,
  };
}

function sanitizeFileName(name) {
  if (!name) return 'file';
  return name.replace(/[^\w.\-]+/g, '_');
}

async function uploadImage(req, res) {
  const { postId, folder, imageType, sortOrder } = req.body || {};
  const file = req.file;

  if (!file) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'file is required',
    });
  }

  if (!postId) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'postId is required',
    });
  }

  const safeName = sanitizeFileName(file.originalname);
  const baseFolder = folder || 'posts';
  const key = `${baseFolder}/${postId}/${Date.now()}_${safeName}`;

  try {
    await storage.uploadBuffer({
      path: key,
      buffer: file.buffer,
      contentType: file.mimetype || 'application/octet-stream',
    });

    const fileUrl = storage.getPublicUrlForPath(key);

    const payload = {
      postid: Number(postId),
      imageurl: fileUrl,
      imagetype: imageType || null,
      sortorder: sortOrder !== undefined ? Number(sortOrder) : null,
      createdat: new Date().toISOString(),
    };

    const { data, error } = await imagesService.createImage(payload);
    if (error) {
      return res.status(500).json({
        status: 'ERROR',
        message: 'Failed to create image record',
        details: error.message,
      });
    }

    return res.status(201).json({
      status: 'OK',
      image: sanitizeImage(data),
      fileUrl,
      key,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to upload image',
      details: error.message,
    });
  }
}

async function listImages(req, res) {
  const { postId } = req.query || {};
  const filters = { postId: parseNumber(postId) || postId };

  const { data, error } = await imagesService.listImages(filters);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch images',
      details: error.message,
    });
  }

  const items = Array.isArray(data) ? data.map(sanitizeImage) : [];
  return res.status(200).json({ status: 'OK', items });
}

async function createImage(req, res) {
  const { postId, imageUrl, imageType, sortOrder } = req.body || {};

  if (!postId || !imageUrl) {
    return res.status(400).json({
      status: 'ERROR',
      message: 'postId and imageUrl are required',
    });
  }

  const payload = {
    postid: Number(postId),
    imageurl: imageUrl,
    imagetype: imageType || null,
    sortorder: sortOrder !== undefined ? Number(sortOrder) : null,
    createdat: new Date().toISOString(),
  };

  const { data, error } = await imagesService.createImage(payload);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to create image',
      details: error.message,
    });
  }

  return res.status(201).json({
    status: 'OK',
    image: sanitizeImage(data),
  });
}

async function deleteImage(req, res) {
  const { imageId } = req.params;
  const deleteFromStorage = req.query?.deleteFromStorage === 'true';

  const { data: existing, error: findError } = await imagesService.getImageById(
    imageId
  );
  if (findError) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to fetch image',
      details: findError.message,
    });
  }
  if (!existing) {
    return res.status(404).json({
      status: 'ERROR',
      message: 'Image not found',
    });
  }

  if (deleteFromStorage) {
    const path = storage.extractPathFromUrl(existing.imageurl);
    if (path) {
      try {
        await storage.deleteByPath(path);
      } catch (error) {
        return res.status(500).json({
          status: 'ERROR',
          message: 'Failed to delete image from storage',
          details: error.message,
        });
      }
    }
  }

  const { data, error } = await imagesService.deleteImage(imageId);
  if (error) {
    return res.status(500).json({
      status: 'ERROR',
      message: 'Failed to delete image',
      details: error.message,
    });
  }

  return res.status(200).json({
    status: 'OK',
    image: sanitizeImage(data),
  });
}

module.exports = {
  uploadImage,
  listImages,
  createImage,
  deleteImage,
};
