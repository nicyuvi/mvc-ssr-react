import { Route, Switch } from 'react-router-dom';
import { ServerSideProps } from '../types';
import './App.css';

const Home = () => <div>Home Page</div>;
const About = () => <div>About Page</div>;

function App({ serverSideProps }: { serverSideProps: ServerSideProps }) {
  const { user } = serverSideProps;
  console.log(user);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
    </Switch>
  );
}

export default App;
