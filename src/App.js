import React, { useEffect, useState } from 'react';
import { getCinemaData } from './apiService';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const result = await getCinemaData();
              setData(result);
          } catch (error) {
              console.error('Error fetching data', error);
          }
      };

      fetchData();
  }, []);

  return (
      <div className="App">
          <h1>Example Data</h1>
          {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
      </div>
  );
}
export default App;
