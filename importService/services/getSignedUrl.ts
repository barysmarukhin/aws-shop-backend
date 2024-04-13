import awsSdk from 'aws-sdk';
import { InvalidDataError } from '../../shared/errors';

const { AWS_REGION, AWS_UPLOAD_BUCKET, AWS_UPLOAD_BUCKET_CATALOG } = process.env;
const S3 = new awsSdk.S3({ region: AWS_REGION });

export const getSignedUrl = (filename: string) => {
  if (!filename) {
    throw new InvalidDataError('Provide valid file name.');
  }

  const catalogPath = `${AWS_UPLOAD_BUCKET_CATALOG}/${filename}`;

  const params = {
    Bucket: AWS_UPLOAD_BUCKET,
    Key: catalogPath,
    Expires: 60,
    ContentType: 'text/csv',
  };

  return S3.getSignedUrlPromise('putObject', params);
};
