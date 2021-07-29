import getConfig from "next/config";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand, S3ClientConfig, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function useS3BucketUpload({
  onUploadStart,
  onUploadReady,
  onError,
  pendingImage,
  method,
}: {
  onUploadStart: () => void;
  onUploadReady: () => void;
  onError: () => void;
  pendingImage: File;
  method: string;
}) {
  const { publicRuntimeConfig } = getConfig();
  const awsAccesskey = publicRuntimeConfig.AWS_ACCESS_KEY_ID;
  const awsSecretAccessKey = publicRuntimeConfig.AWS_SECRET_ACCESS_KEY;
  const awsBucket = publicRuntimeConfig.AWS_BUCKET;
  const awsRegion = publicRuntimeConfig.AWS_REGION;

  // s3 client config
  const s3Config: S3ClientConfig = {
    credentials: {
      accessKeyId: awsAccesskey,
      secretAccessKey: awsSecretAccessKey,
    },
    region: awsRegion,
  };

  // Starting upload
  onUploadStart();

  // Using method 1
  if (method === "Method 1") {
    const s3BucketUploadResults1 = await s3PresignedUpload(pendingImage, s3Config, awsBucket);

    if (s3BucketUploadResults1.status) {
      // The upload is done successfully
      onUploadReady();
      return { status: true, url: s3BucketUploadResults1.url };
    } else {
      // The upload failed
      onError();
      return { status: false, url: s3BucketUploadResults1.url };
    }
  }

  // Using method 2
  else if (method === "Method 2") {
    const s3BucketUploadResults2 = await s3DirectUpload(pendingImage, s3Config, awsBucket);

    if (s3BucketUploadResults2.status) {
      // The upload is done successfully
      onUploadReady();
      return { status: true, url: s3BucketUploadResults2.url };
    } else {
      // The upload failed
      onError();
      return { status: false, url: s3BucketUploadResults2.url };
    }
  }
  // No method
  else return { status: false, url: "No method selected" };
}

// Method 1: usind pre-signed url to upload
async function s3PresignedUpload(image: File, s3Config: S3ClientConfig, awsBucket: string) {
  // Init s3 client
  const s3 = new S3Client(s3Config);

  // Get presigned upload url
  let presignedUploadUrl: string;
  try {
    presignedUploadUrl = await getSignedUrl(s3, new GetObjectCommand({ Bucket: awsBucket, Key: image.name }), {
      expiresIn: 3600,
    });
  } catch (error) {
    return { status: false, url: error };
  }

  // Use presignedUploadUrl to upload image
  let results;
  try {
    results = await fetch(
      new Request(presignedUploadUrl, {
        method: "PUT",
        body: image,
        headers: new Headers({
          "Content-Type": "image/*",
        }),
      }),
    );
  } catch (error) {
    return { status: false, url: error };
  }

  if (results.status !== 200) {
    // The upload failed
    return { status: false, url: results };
  } else {
    // The upload success
    return { status: true, url: results };
  }
}

// Method 2: usind direct upload
async function s3DirectUpload(image: File, s3Config: S3ClientConfig, awsBucket: string) {
  // Init s3 client
  const s3Client = new S3Client(s3Config);

  // Create an object and upload
  const params = {
    Bucket: awsBucket,
    Key: image.name,
    Body: image,
  };

  try {
    const results = await s3Client.send(new PutObjectCommand(params));

    // The upload success
    return { status: true, url: results };
  } catch (error) {
    // The upload failed
    return { status: false, url: error };
  }
}
