import React, { useState } from 'react';

const App: React.FC = () => {
  const [count, setCount] = useState('');
  return (
    <>
      <h1>{count}</h1>
      <input value={count} onChange={({ target }) => setCount(target.value)}></input>
    </>
  );
};

export default App;
