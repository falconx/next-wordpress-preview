import { getPost, getDraftPost, getAllPosts } from '../lib/api';

const Post = props => (
  <div>
    <h1>{props.title}</h1>
  </div>
);

export async function getStaticProps({ params, preview = false, previewData }) {
  const postId = params.slug;
  const postType = 'page';

  const post = preview
    ? await getDraftPost(postId, postType, previewData.rev, previewData.wpnonce)
    : await getPost(postId, postType);

  return {
    props: {
      title: post.title.rendered,
    },
  };
}

export async function getStaticPaths() {
  const pages = await getAllPosts('page');

  return {
    paths: pages.map(page => ({
      params: { slug: page.slug },
    })),
    fallback: false,
  };
}

export default Post;