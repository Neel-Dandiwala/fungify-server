const cloudinary = require("cloudinary");

//config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.upload = async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.remove = (req, res) => {
  let resume_id = req.body.asset_id;
  console.log(resume_id);
  cloudinary.uploader.destroy(resume_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    console.log(result);
    res.send("ok");
  });
};
