import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req: Request) {
  const data = await req.formData();
  const entry = data.get('file');

  if (entry && entry instanceof File) {
    const file = entry;

    const s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.MY_AWS_SECRET_KEY as string,
      },
    });

    const ext = file.name.split('.').pop();
    const newFileName = uniqid() + '.' + ext;

    const stream = file.stream();
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);

    const bucket = 'crust-craft';
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: 'public-read',
      ContentType: file.type,
      Body: buffer,
    }));

    const link = `https://${bucket}.s3.amazonaws.com/${newFileName}`;
    return Response.json(link);
  }

  return Response.json({ error: "No file uploaded or invalid file" });
}