import { getDraftPost } from '../../lib/api';

const PREVIEW_SECRET = 'abc123';

export default async (req, res) => {
  const { secret, id, type, rev, wpnonce } = req.query;

  // check the secret and next parameters
  if (secret !== PREVIEW_SECRET) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  // fetch the headless CMS to check if the provided `slug` exists
  const post = await getDraftPost(id, type, rev, 'draft', wpnonce);

  // if the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({ message: 'Post not found' });
  }

  // enable Preview Mode by setting the cookies
  res.setPreviewData({
    rev,
    wpnonce,
  });

  // redirect to the path from the fetched post
  // we don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
  res.writeHead(307, { Location: `/${post.id}` });
  res.end();
};