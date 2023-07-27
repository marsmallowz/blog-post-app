import { gql } from "@apollo/client";

export const USER_BY_ID_QUERY = gql`
  query GetUserByID($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      gender
      status
      posts {
        edges {
          node {
            id
            title
            body
          }
        }
      }
    }
  }
`;
