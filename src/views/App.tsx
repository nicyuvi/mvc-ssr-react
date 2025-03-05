import { Link, Redirect, Route, Switch } from 'react-router-dom';
import { ServerSideProps, StaticContextType } from '@types';

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
  const shouldRedirect = true; // Add your redirect condition here

  if (shouldRedirect) {
    return <Redirect to="/about" />;
  }

  return <div>Redirect Page</div>;
};

interface NotFoundProps {
  staticContext: StaticContextType;
}

const NotFound = ({ staticContext }: NotFoundProps) => {
  if (staticContext) staticContext.status = 404;
  return (
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  );
};

function App({ serverSideProps }: { serverSideProps: ServerSideProps }) {
  const { user } = serverSideProps;

  return (
    <Switch>
      <Route exact path="/" render={() => <Home user={user} />} />
      <Route exact path="/about" component={About} />
      <Route exact path="/redirect-test" component={RedirectPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
