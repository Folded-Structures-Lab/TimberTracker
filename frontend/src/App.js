import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Home} from './pages/Home'; // Make sure the import is correct
import {About} from './pages/About'; 
import {DemandData} from './pages/DemandData'; 
import {SupplyData} from './pages/SupplyData'; 
import {ConsumptionMap} from './pages/ConsumptionMap'; 
import {ComingSoon} from './pages/ComingSoon'; // Make sure the import is correct
import { Helmet } from 'react-helmet';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Helmet>
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-N3RJYWPW0G"></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-N3RJYWPW0G');
            `}
          </script>
        </Helmet> 

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/consumption/data' element={<DemandData />} />
          <Route path='/consumption/map' element={<ConsumptionMap />} />
          <Route path='/production/data' element={<SupplyData />} />
          <Route path='/production/map' element={<ComingSoon />} />
          {/* <Route path='/consumption-map' element={<ConsumptionMap />} /> */}

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
