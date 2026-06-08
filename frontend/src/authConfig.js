export const cognitoConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_hGXNY29tx",
      userPoolClientId: "7gbkem0pg1ra1n6vq76uj0mqnu",
      loginWith: {
        oauth: {
          domain: "us-east-1hgxny29tx.auth.us-east-1.amazoncognito.com",
          scopes: ["openid", "email", "profile"],
          redirectSignIn: [window.location.origin],
          redirectSignOut: [window.location.origin],
          responseType: "code",
        },
      },
    },
  },
};