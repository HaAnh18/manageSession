const multer = require("multer");
const path = require("path");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploaded files
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    // Set the filename to include the current timestamp and the original file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Middleware function for handling file uploads and filtering file formats
const handleFileUploadError = (req, res, next) => {
  // This middleware handles errors during file upload
  const uploadImg = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|JPG|png/;
      const mimeType = fileTypes.test(file.mimetype);
      const extname = fileTypes.test(path.extname(file.originalname));

      if (mimeType && extname) {
        // If the file format is allowed, accept the file
        return cb(null, true);
      }

      // If the file format is not allowed, render the signup page with an error message
      res.render("signup", { message: "Check the file format" });
    },
  }).single('image');

  // Call the middleware
  uploadImg(req, res, next);
};

module.exports = handleFileUploadError;
