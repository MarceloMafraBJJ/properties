"use server";

import { v4 as uuid } from "uuid";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: process.env.AMAZON_S3_REGION,
  credentials: {
    accessKeyId: process.env.AMAZON_S3_ACCESS_KEY,
    secretAccessKey: process.env.AMAZON_S3_SECRET_KEY,
  },
});

async function handleS3Upload(file: Buffer, fileName: string): Promise<string> {
  const resizedImageBuffer = await sharp(file).resize(400, 500).toBuffer();

  const params = {
    Bucket: process.env.AMAZON_S3_BUCKET_NAME,
    Key: fileName,
    Body: resizedImageBuffer,
    ACL: "public-read",
    ContentType: "image/*",
  };

  const command = new PutObjectCommand(params as any);
  await s3Client.send(command);

  return fileName;
}

const uploadImageToS3 = async ({ formData }: { formData: FormData }) => {
  try {
    const file = formData.get("image") as Blob | null;

    if (!file) {
      return;
    }

    const mimeType = file.type;

    const fileExtension = mimeType?.split("/")[1];

    const buffer = Buffer.from(await file.arrayBuffer());

    const fileName = await handleS3Upload(buffer, uuid() + "." + fileExtension);

    let imageUrl = `https://${process.env.AMAZON_S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`;

    return imageUrl;
  } catch (error) {
    console.log(error);
  }
};

const deleteImageFromS3 = async ({ file }: { file: string }) => {
  try {
    if (!file) {
      return;
    }

    const filename = file.substring(file.lastIndexOf("/") + 1);

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AMAZON_S3_BUCKET_NAME,
        Key: filename,
      }),
    );

    return true;
  } catch (error) {
    console.log(error);
  }
};

export { uploadImageToS3, deleteImageFromS3 };
