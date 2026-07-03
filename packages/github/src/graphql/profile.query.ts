export const PROFILE_QUERY = `
  query GitHubPetProfileQuery($login: String!) {
    user(login: $login) {
      login
      name
      followers {
        totalCount
      }
      repositories(first: 1) {
        totalCount
      }
    }
  }
`;
