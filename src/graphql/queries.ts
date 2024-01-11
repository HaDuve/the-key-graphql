import { gql } from "@apollo/client";

export const GET_CONTENT_NODES_QUERY = gql`
  query GetContentNodes(
    $before: String
    $after: String
    $first: Int
    $last: Int
  ) {
    Admin {
      Tree {
        GetContentNodes(
          before: $before
          after: $after
          first: $first
          last: $last
        ) {
          edges {
            node {
              structureDefinition {
                title
              }
            }
          }
        }
      }
    }
  }
`;
