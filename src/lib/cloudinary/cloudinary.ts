export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
};

export const getCloudinaryUploadUrl = () => {
  return `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`;
};

// Note: For production, image deletion should be handled by a backend API
// to keep API credentials secure. This is a client-side workaround.
// Cloudinary unsigned uploads cannot be deleted from the client without exposing secrets.
export const deleteCloudinaryImage = async (publicId: string): Promise<void> => {
  // For security reasons, deletion should be handled server-side
  // This is a placeholder - you'll need to implement a backend endpoint
  throw new Error('Image deletion must be handled server-side for security. Please implement a backend API endpoint.');
};
