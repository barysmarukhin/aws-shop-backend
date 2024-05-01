import { Handler, APIGatewayRequestAuthorizerEventV2 } from 'aws-lambda';
import logger from '../shared/logger';
import { validateToken } from './services/tokenValidationService';
import { generatePolicy } from './services/policyGeneratorService';
import NotAuthorizedError from './NotAuthorizedError';

const validateRequest = (event: APIGatewayRequestAuthorizerEventV2) => {
  const { authorization } = event.headers;
  if (authorization) return;

  throw new NotAuthorizedError();
};

export const handler: Handler = async (event: APIGatewayRequestAuthorizerEventV2) => {
  logger('authorizer', event);

  const { headers, routeArn } = event;
  const { authorization: token } = headers;

  const encodedCredentials = token?.split(' ')[1];

  try {
    validateRequest(event);
    validateToken(token);
    return generatePolicy(encodedCredentials, routeArn, 'Allow');
  } catch (e) {
    return generatePolicy(encodedCredentials, routeArn, 'Deny');
  }
};
