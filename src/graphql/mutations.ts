import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation LoginJwt($input: LoginJwtInput!) {
    Auth {
      loginJwt(input: $input) {
        jwtTokens {
          accessToken
        }
        clientMutationId
      }
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logoutJwt {
      success
    }
  }
`;
