import { Route, Switch } from 'react-router-dom';
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
const About = () => <div>About Page</div>;

function App({ serverSideProps }: { serverSideProps: ServerSideProps }) {
  const { user } = serverSideProps;
  console.log(user);

  return (
    <Switch>
      <Route exact path="/" render={() => <Home user={user} />} />
      <Route exact path="/about" component={About} />
    </Switch>
  );
}

export default App;
