import ApiBase from '../api-base';

const githubClientId =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CLIENT_ID
    : process.env.REACT_APP_GITHUB_CLIENT_ID;

const githubClientSecret =
  process.env.NODE_ENV === 'production'
    ? process.env.GITHUB_CLIENT_SECRET
    : process.env.REACT_APP_GITHUB_CLIENT_SECRET;

export default class GithubService extends ApiBase {
  constructor() {
    super('https://api.github.com', {
      client_id: githubClientId,
      client_secret: githubClientSecret,
    });

    this.searchUser = text =>
      this.get('search/users', {
        params: { q: text },
      });

    this.getUser = login => this.get(`users/${login}`);

    this.getUserRepos = login =>
      this.get(`users/${login}/repos`, {
        params: {
          per_page: 5,
          sort: 'created:asc',
        },
      });
  }
}
