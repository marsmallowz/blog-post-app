import { gql } from "@apollo/client";

export const POST_QUERY = gql`
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      title
      body
      comments {
        edges {
          node {
            id
            name
            body
            email
          }
        }
      }
    }
  }
`;
