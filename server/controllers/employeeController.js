const db = require("../database/db");
const multer = require('multer');
const path = require('path');

// Set up Multer storage and file checking
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/')); // Use path.join for cross-platform compatibility
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename using timestamp
  }
});

// Check file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/; // Allow jpeg, jpg, png
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // File is valid
  } else {
    cb(new Error('Error: Images Only!')); // File type is not allowed
  }
}

// Init Multer upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single('image_url'); // Expecting 'image_url' as the form key

// Register employee function
const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      position,
      department,
      date_of_birth,
      salary,
      status
    } = req.body;

    // Validation checks
    if (!first_name || !last_name || !email || !phone_number || !position || !department || !date_of_birth || !salary || !status) {
      throw new Error('All fields are required');
    }

    // Check if the file is uploaded
    const image_url = req.file ? `uploads/${req.file.filename}` : null;

    // Insert employee data into the database
    const employeeRegisterQuery = `
      INSERT INTO employee_registration (
        first_name, last_name, email, phone_number,
        position, department, date_of_birth, salary, status, image_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`;
    
    const result = await db.query(employeeRegisterQuery, [
      first_name,
      last_name,
      email,
      phone_number,
      position,
      department,
      date_of_birth,
      salary,
      status,
      image_url
    ]);

    // If insert was successful, return the result
    const employeeRegistration = result?.rows?.[0];
    res.status(200).json({ code: 200, data: employeeRegistration });
  } catch (error) {
    // Catch any errors and send a 400 status response with error message
    res.status(400).json({ code: 400, message: error.message });
  }
};

// Fetch all employees
const getAllEmployees = async (req, res) => {
  try {
    const query = `SELECT * FROM "employee_registration"`;
    const result = await db.query(query);
    res.status(200).json({ data: result.rows }); 
  } catch (error) {
    console.error('Error fetching employees:', error.message);
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

// Export the register function and multer upload middleware
module.exports = { register, upload, getAllEmployees };
