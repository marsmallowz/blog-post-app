import { gql } from "urql";

export const COMMENTS_QUERY = gql`
  query CommentsQuery {
    comments {
      nodes {
        id
        name
        body
        email
      }
    }
  }
`;
