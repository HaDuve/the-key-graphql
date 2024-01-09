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
