import { Suspense, useState } from 'react';
import styles from './App.module.scss';
// import { Outlet, useNavigate } from 'react-router-dom';

function App() {
  const [state, setState] = useState(0);
  // const navigate = useNavigate();

  return (
    <>
      <h1 className={styles.title}>
        Test geosemantica
      </h1>
    </>
  );
}

export default App;
