import path from "path";

export const testItem = async (req, res) => {
  const images = req.files?.image;

  const imageArray = Array.isArray(images) ? images : [images];

  let uploadResults = [];

  for (const image of imageArray) {
    const uploadPath = path.join(
      process.cwd(),
      "uploads",
      Date.now() + "_" + image.name
    );
    console.log(uploadPath);
    try {
      await image.mv(uploadPath);
      uploadResults.push({
        message: "File uploaded successfully!",
        path: uploadPath,
      });
    } catch (err) {
      return res.status(500).json({ message: "Upload failed", error: err });
    }
  }

  res.json({
    message: "All files uploaded successfully!",
    uploads: uploadResults,
  });
};
