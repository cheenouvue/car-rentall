import path from "path";
import fs from "fs";
import mime from "mime-types";

// ฟังก์ชันอัปโหลดไฟล์
export const uploadFile = async (file, folder = "uploads") => {
  try {
    if (!file) {
      throw new Error("ไม่มีไฟล์ที่อัปโหลด");
    }

    // ตรวจสอบประเภทไฟล์
    const fileType = mime.lookup(file.name);
    if (!fileType || !fileType.startsWith("image/")) {
      throw new Error("อัปโหลดได้เฉพาะไฟล์รูปภาพเท่านั้น (JPG, PNG, GIF, WebP ฯลฯ)");
    }

    // สร้างโฟลเดอร์อัปโหลดถ้ายังไม่มี
    const uploadDir = path.join(process.cwd(), folder);
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // ตั้งชื่อไฟล์ใหม่
    const fileExt = path.extname(file.name);
    const fileName = `${Date.now()}${fileExt}`;
    const filePath = path.join(uploadDir, fileName);

    // ย้ายไฟล์ไปที่โฟลเดอร์
    await file.mv(filePath);

    return fileName;
  } catch (error) {
    throw new Error("อัปโหลดไฟล์ล้มเหลว: " + error.message);
  }
};
