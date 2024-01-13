import { DocumentNode, gql } from "@apollo/client";

export const GET_CONTENT_NODES_QUERY: DocumentNode = gql`
  query Query($first: Int, $before: String, $after: String, $last: Int) {
    Admin {
      Tree {
        GetContentNodes(
          first: $first
          before: $before
          after: $after
          last: $last
        ) {
          edges {
            node {
              structureDefinition {
                title
              }
              id
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
        }
      }
    }
  }
`;
