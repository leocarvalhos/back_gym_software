import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

const endpoint = 'https://kjjltbuybjmvxmrpzvcf.supabase.co/storage/v1';
const provider = 's3';
const bucket = 'gymSoftware';
const s3 = new S3Client({
  endpoint: `${endpoint}/${provider}`,
  region: 'sa-east-1',
  credentials: {
    accessKeyId: '55557be74af564db220fb5b8585bdd05',
    secretAccessKey:
      '83ff8b874161436bad11fa33535af214632ed717b7d9aeb9573a04fe77f281b0',
  },
});

export const uploadFile = async (
  path: string,
  buffer: any,
  mimetype: string,
) => {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    }),
  );

  return {
    url: `${endpoint}/object/public/${bucket}/${path}`,
    path: path,
  };
};

export const deleteFile = async (folder: string) => {
  //   await s3
  //     .deleteObject({
  //       Bucket: process.env.BB_NAME,
  //       Key: path,
  //     })
  //     .promise();

  const params = {
    Bucket: process.env.BB_NAME,
    Prefix: folder,
  };
  const listedObjects = await s3.send(new ListObjectsV2Command(params));

  if (listedObjects.Contents.length === 0) {
    return;
  }

  const deleteParams = {
    Bucket: process.env.BB_NAME,
    Delete: { Objects: [] },
  };

  listedObjects.Contents.forEach(({ Key }) => {
    deleteParams.Delete.Objects.push({ Key });
  });

  await s3.send(new DeleteObjectsCommand(deleteParams));
};
