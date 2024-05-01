import {
  APIGatewayAuthorizerEvent,
  APIGatewayEvent,
  APIGatewayRequestAuthorizerEventV2,
  SQSEvent,
} from 'aws-lambda';

const logger = (
  handler: string,
  event:
    | APIGatewayEvent
    | SQSEvent
    | APIGatewayAuthorizerEvent
    | APIGatewayRequestAuthorizerEventV2,
) => {
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

  const { httpMethod, path, pathParameters, queryStringParameters, headers, body } =
    event as APIGatewayEvent;

  console.log(
    handler,
    JSON.stringify({
      httpMethod,
      path,
      pathParameters,
      queryStringParameters,
      body,
      headers,
    }),
  );
};

export default logger;
