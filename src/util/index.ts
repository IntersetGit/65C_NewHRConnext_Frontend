export const getUploadUrl = () => {
  return import.meta.env.VITE_BACKEND_FILE_UPLOAD;
};

export const getFilePath = () => {
  return import.meta.env.VITE_BACKEND_FILE_PATH;
};
