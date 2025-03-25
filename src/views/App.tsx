import { Link, Route, Routes } from 'react-router-dom';
import { ServerSideProps } from '@types';

interface HomeProps {
  user: { id: string; name: string } | undefined;
}

const Home = ({ user }: HomeProps) => (
  <div>
    <h1 className="mt-2 mb-4 text-red-500">Home Page</h1>
    <p>server side props: </p>
    <p>{user?.id}</p>
    <p>{user?.name}</p>
    <Link to="/about">About</Link>
  </div>
);

const About = () => {
  return <div>About Page</div>;
};

const RedirectPage = () => {
  throw new Response('', { status: 301, headers: { Location: '/about' } });
};

const NotFound = () => {
  return (
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  );
};

function App({ serverSideProps }: { serverSideProps: ServerSideProps }) {
  const { user } = serverSideProps;

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/about" element={<About />} />
      <Route path="/moved-permanently" element={<RedirectPage />} />
      {/* Catch-all route for 404 pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
