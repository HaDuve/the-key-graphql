import { DocumentNode, gql } from '@apollo/client'

export const LOGIN_MUTATION: DocumentNode = gql`
  mutation LoginJwt($input: LoginJwtInput!) {
    Auth {
      loginJwt(input: $input) {
        loginResult {
          jwtTokens {
            accessToken
          }
        }
      }
    }
  }
`
