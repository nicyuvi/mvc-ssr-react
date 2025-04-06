import { Link, Route, Routes } from 'react-router-dom';
import { ServerSideProps } from '@types';

const Home = () => (
  <div>
    <h1 className="mt-2 mb-4 text-red-500">Home Page</h1>
    <p>Home Page</p>
    <Link to="/about">About</Link>
  </div>
);

const About = () => {
  return <div>About Page</div>;
};

const RedirectPage = () => {
  throw new Response('', { status: 301, headers: { Location: '/about' } });
};

// FIX: return JSX so page goes through app bundle (styling, components, etc)
// create client state with status codes and pass to server during render
const NotFound = () => {
  const htmlContent = `
    <html>
      <head>
        <title>404 - Page Not Found</title>
      </head>
      <body class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
        <div class="text-center p-6 bg-white shadow-lg rounded-lg w-full max-w-md">
          <h1 class="text-4xl font-bold text-red-500 mb-4">Sorry, we couldn't find the page you're looking for.</h1>
          <button
            onclick="window.location.href = '/';"
            class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Go back to Home
          </button>
        </div>
      </body>
    </html>
  `;

  throw new Response(htmlContent, {
    status: 404,
    headers: { 'Content-Type': 'text/html' },
  });
};

function App({ serverSideProps }: { serverSideProps: ServerSideProps }) {
  // NOTE: This should log initially on the server during prerender
  // and again on the client during hydration
  console.log('Server Side Props:', serverSideProps);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/moved-permanently" element={<RedirectPage />} />
      {/* Catch-all route for 404 pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
