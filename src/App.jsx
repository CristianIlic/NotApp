import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { getAuth } from 'firebase/auth'; // Firebase v9+
import { getDatabase } from 'firebase/database'; // Firebase v9+
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire';

function App() {
    
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
  
  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  const auth = getAuth(app);
  
  return (
    
    <AuthProvider sdk={auth}>
      <DatabaseProvider sdk={database}>
        <Router>
          <Navbar />
          <div className="App">
            <Routes>
              <Route path='/' Component={Home} />
              <Route path='/signup' Component={SignUp} />
              <Route path='/login' Component={Login} />
            </Routes>
          </div>
        </Router>
      </DatabaseProvider>
    </AuthProvider>
  )
 }


export default App
