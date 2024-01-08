import { gql } from "@apollo/client";

export const GET_CONTENT_NODES_QUERY = gql`
  query GetContentNodes {
    Admin {
      Tree {
        GetContentNodes {
          node {
            structureDefinition {
              title
            }
          }
        }
      }
    }
  }
`;
