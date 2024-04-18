import awsSdk from 'aws-sdk';
import { Product } from '../types';

const { SNS_ARN, AWS_REGION } = process.env;
const sns = new awsSdk.SNS({ region: AWS_REGION });

const productCreated = (data: Product[]) => {
  sns.publish(
    {
      Subject: 'Product(s) created',
      Message: `Product(s) created -- ${JSON.stringify(data)}`,
      TopicArn: SNS_ARN,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    },
  );
};

export default {
  productCreated,
};
