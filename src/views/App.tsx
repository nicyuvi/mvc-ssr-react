import { Redirect, Route, Switch } from 'react-router-dom';
import { ServerSideProps } from '../types';
import './App.css';

interface HomeProps {
  user: { id: string; name: string } | undefined;
}

const Home = ({ user }: HomeProps) => (
  <>
    <h1>Home Page</h1>
    <p>server side props: </p>
    <p>{user?.id}</p>
    <p>{user?.name}</p>
  </>
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

function App({ serverSideProps }: { serverSideProps: ServerSideProps }) {
  const { user } = serverSideProps;

  return (
    <Switch>
      <Route exact path="/" render={() => <Home user={user} />} />
      <Route exact path="/about" component={About} />
      <Route exact path="/redirect-test" component={RedirectPage} />
    </Switch>
  );
}

export default App;
