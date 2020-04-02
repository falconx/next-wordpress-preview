# WordPress Instructions

1. Install and follow the instructions for [jwt-authentication-for-wp-rest-api](https://en-gb.wordpress.org/plugins/jwt-authentication-for-wp-rest-api)

2. Set `preview_post_link` in your `functions.php`:

```
/**
 * Customize the preview button in the WordPress admin to point to the headless client.
 *
 * @param  str $link The WordPress preview link.
 * @return str The headless WordPress preview link.
 */
function set_headless_preview_link($link) {
  $post = get_post();

  if (!$post) {
    return $link;
  }

  $secret = PREVIEW_SECRET;
  $status = 'revision';
  $frontend = FRONTEND_URL;
  $parent_id = $post->post_parent;
  $revision_id = $post->ID;
  $type = get_post_type($parent_id);
  $wpnonce = wp_create_nonce('wp_rest');

  if (0 === $parent_id) {
    $status = 'draft';
  }

  return "$frontend/api/preview?secret=$secret&id=$parent_id&rev=$revision_id&type=$type&status=$status&wpnonce=$wpnonce";
}

add_filter('preview_post_link', 'set_headless_preview_link');
```