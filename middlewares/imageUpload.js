import expressFileUpload from 'express-fileupload';

export const imageUpload = expressFileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 5 * 1024 * 1024 }, // Optional: 5MB image limit
});
