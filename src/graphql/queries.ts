import { gql } from '@apollo/client';

export const GET_REPOS = gql`
  query getRepos($pageItems: Int!, $page: Int!) {
    repositories(pageItems: $pageItems, page: $page) {
      name
      size
      #   owner {
      #     login
      #   }
    }
  }
`;

export const GET_REPO_DETAILS = gql`
  query getRepoDetails($owner: String!, $repoName: String!) {
    repositoryDetails(owner: $owner, repoName: $repoName) {
      name
      size
      owner
      private
      fileCount
      fileContent
      webhooks
    }
  }
`;
