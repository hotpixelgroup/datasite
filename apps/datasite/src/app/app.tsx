import { useRoutes, Link } from 'react-router-dom';
import { routes } from './routes';

export function App() {
  const element = useRoutes(routes);

  /* TODO: Come up with something engineers actually do in the real world applications to
   demonstrate their knowledge of Typescript, React, React Router, state management solutions,
   Observables, hooks, custom hooks, API integrations, component hydration, something
   that actually demonstrates real-world engineering tasks.
   Once they have done that, unleash them with something they can show off with AI.
 */

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/about">About</Link>
        {' | '}
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <hr />
      {element}
    </div>
  );
}

export default App;
