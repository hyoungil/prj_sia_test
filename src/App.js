import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom'
import React, { Suspense } from 'react'
import ClipLoader from "react-spinners/ClipLoader";

const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<ClipLoader color="primary" />}>
        <Routes>
          {/* <Route exact path="/Home" name="Dashboard" element={<DashboardPage />} /> */}
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
