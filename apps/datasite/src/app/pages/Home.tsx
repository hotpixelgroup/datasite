import { NxWelcome } from '../nx-welcome';
import { useHealthCheck } from '@datasite/hooks';

export function Home() {
  const { data, loading, error } = useHealthCheck();

  return (
    <>
      <NxWelcome title="Datasite" />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>API Status: {data?.status}</p>
      )}
    </>
  );
}

export default Home;
