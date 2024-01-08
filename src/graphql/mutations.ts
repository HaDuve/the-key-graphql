import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    loginJwt(username: $username, password: $password) {
      accessToken
      user {
        username
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
