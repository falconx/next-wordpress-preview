import { getPost, getPreviewPost } from '../../lib/api';

// Todo: move to env variable
const PREVIEW_SECRET = 'abc123';

export default async (req, res) => {
  const { secret, id, type, rev, status, wpnonce } = req.query;

  // check the secret and next parameters
  if (secret !== PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // fetch the headless CMS to check if the provided `slug` exists
  const post = await getPreviewPost(id, type, rev, status, wpnonce)

  // if the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Post not found' });
  }

  // enable Preview Mode by setting the cookies
  res.setPreviewData({
    rev,
    type,
    status,
    wpnonce,
  });

  // redirect to the path from the fetched post
  // we don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${post.id}` });
  res.end();
};