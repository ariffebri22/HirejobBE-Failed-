const { postProfile } = require("../model/profileModel");

const cloudinary = require("../config/photo");

const profileController = {
  postData: async (req, res, next) => {
    const { position, domicile, company_work, job_desc, photo_worker } =
      req.body;
    console.log("post file");
    console.log(req.file);

    console.log(req.body);

    console.log("post data");

    console.log(position, domicile, company_work, job_desc, photo_worker);

    if (!req.isFileValid) {
      return res.status(404).json({ message: req.isFileValidMessage });
    }

    const ImageCloud = await cloudinary.uploader.upload(req.file.path, {
      folder: "HireJob Project",
    });

    if (!ImageCloud) {
      return res.status(404).json({ message: "upload photo fail" });
    }
    console.log(ImageCloud);

    let id_worker = req.payload.id;
    console.log("payload");
    console.log(req.payload);
    console.log(id_worker, position, domicile, company_work, job_desc, photo_worker);

    if (
      !id_worker ||
      !position ||
      !domicile ||
      !company_work ||
      !job_desc 
      // !photo_worker
    ) {
      return res.status(404).json({
        message: "input correctly",
      });
    }

    let data = {
      id_worker,
      position,
      domicile,
      company_work,
      job_desc,
      photo_worker: ImageCloud.secure_url,
    };

    console.log("data");
    console.log(data);

    let result = await postProfile(data);
    console.log(result);

    return res
      .status(200)
      .json({ status: 200, message: "data recipe success", data });
  },
};

module.exports = profileController;