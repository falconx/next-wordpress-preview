import fetch from 'isomorphic-unfetch';

const USERNAME = 'mattlayt';
const PASSWORD = 'mattlayt';

const API_URL = 'http://192.168.0.14/unheard-www/wp-json';

const getToken = async () => {
  // generate jwt
  // Todo: cache token in localStorage and request again once invalid?
  const response = await fetch(`${API_URL}/jwt-auth/v1/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: USERNAME,
      password: PASSWORD,
    }),
  }).then(res => res.json());

  return response.token;
};

export const getAllPosts = async (type) => {
  const url = `${API_URL}/wp/v2/${type}s`;

  const posts = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());

  return posts;
};

export const getPost = async (slug, type) => {
  const posts = await getAllPosts(type);

  return posts.find(post => post.slug === slug);
};

export const getDraftPost = async (id, type, rev, wpnonce) => {
  // authenticate to access protected endpoint
  const token = await getToken();

  // fetch page/post data
  const url = `${API_URL}/wp/v2/${type}s/${rev}`;

  const post = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'X-WP-Nonce': wpnonce,
      'Authorization': `Bearer ${token}`,
    },
  }).then(res => res.json());

  return post;
};