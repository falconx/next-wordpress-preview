import Head from 'next/head';

const Home = () => (
  <div className="container">
    <Head>
      <title>NextJS + Wordpress Example</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
      <h1>
        NextJS &amp; Wordpress Example
      </h1>
    </main>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: Arial;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Home;
