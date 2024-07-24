import { gql } from '@apollo/client';

export const GET_REPOS = gql`
  query getRepos($pageItems: Int!, $page: Int!, $token: String!) {
    repositories(pageItems: $pageItems, page: $page, token: $token) {
      name
      size
      owner {
        login
      }
    }
  }
`;

export const GET_REPO_DETAILS = gql`
  query getRepoDetails($owner: String!, $repoName: String!, $token: String!) {
    repositoryDetails(user: $owner, repo: $repoName, token: $token) {
      name
      size
      owner {
        login
      }
      private
      fileCount
      fileContent
      webhooks {
        id
        url
        type
        name
        active
      }
    }
  }
`;
