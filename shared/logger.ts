import { APIGatewayEvent, SQSEvent } from 'aws-lambda';

const logger = (handler: string, event: APIGatewayEvent | SQSEvent) => {
  if ((event as SQSEvent).Records) {
    const { Records: sqsRecords } = event as SQSEvent;
    console.log(
      handler,
      JSON.stringify({
        sqsRecords,
      }),
    );
    return;
  }

  const { httpMethod, path, pathParameters, queryStringParameters, body } =
    event as APIGatewayEvent;

  console.log(
    handler,
    JSON.stringify({
      httpMethod,
      path,
      pathParameters,
      queryStringParameters,
      body,
    }),
  );
};

export default logger;
