import { gql } from '@apollo/client';

export const GET_REPOS = gql`
  query getRepos($pageItems: Int!, $page: Int!) {
    repositories(pageItems: $pageItems, page: $page) {
      name
      size
      owner {
        login
      }
    }
  }
`;

export const GET_REPO_DETAILS = gql`
  query getRepoDetails($owner: String!, $repoName: String!) {
    repositoryDetails(user: $owner, repo: $repoName) {
      name
      size
      owner {
        login
      }
      private
      fileCount
      #   fileContent
      #   webhooks
    }
  }
`;
