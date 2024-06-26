export const generatePolicy = (
  principalId: string,
  resource: string,
  effect: 'Deny' | 'Allow',
) => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Resource: resource,
        Effect: effect,
      },
    ],
  },
});
