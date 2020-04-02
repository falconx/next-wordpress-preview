export default async (_, res) => {
  // exit the current user from "Preview Mode"
  res.clearPreviewData();

  // redirect the user back to the index page
  res.writeHead(307, { Location: '/' });
  res.end();
}