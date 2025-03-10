import prisma from "../config/config.js";
import { sendSuccess } from "../service/reponseHandler.js";
import { uploadMoreFile } from "../service/uploadMorefile.js"; // Assuming uploadMoreFile handles file saving logic

export const uploadImageWithIdentityCard = async (req, res) => {
  try {
    const { name } = req.body;
    const files = req.files;

    const uploadedFileNames = await uploadMoreFile(files.identity_card);

    const identityCardImages = uploadedFileNames.join(",");

    const newImage = await prisma.image.create({
      data: {
        name: name,
        identity_card: identityCardImages,
      },
    });

    sendSuccess(res, "Success", newImage);
  } catch (error) {
    console.error("Error uploading files:", error.message);
    res.status(500).json({ error: "Error uploading files" });
  }
};
