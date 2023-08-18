const app = require("express");
const router = app.Router();
const { Protect } = require("../middleware/protect");
const upload = require("../middleware/uploadFile")
const {
  postData,
} = require("../controller/profileController");

router.post("/", Protect, upload.single('photo_worker'), postData);


module.exports = router;
