const express = require("express");
const multer = require("multer");
const employeeController = require("../controllers/employeeControllers");

const router = express.Router();

// configuring multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const suffix = file.mimetype.split("/")[1];
    cb(null, `files/node-crud-${file.fieldname}-${Date.now()}.${suffix}`);
  },
});

// calling multer function
const upload = multer({
  storage: multerStorage,
});

router.get("/", employeeController.emloyee_index)

  .get("/create", employeeController.emloyee_create_get)

  .post("/", upload.single("image"), employeeController.emloyee_create_post)

  .get("/:employeeId",employeeController.emloyee_edit)

  .put("/:employeeId", upload.single("image"), employeeController.emloyee_update)

  .delete("/:employeeId", employeeController.emloyee_delete);

module.exports = router;
