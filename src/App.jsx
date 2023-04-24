import Navbar from './components/Navbar'
import Home from './components/Home'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Teacher from './components/Teacher'
import Burrito from './components/ejemploConexionBBDD'
import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { auth } from './AuthContext'
import { getDatabase } from 'firebase/database'; // Firebase v9+
import { AuthProvider, DatabaseProvider, useFirebaseApp } from 'reactfire';

function App() {
    
  const app = useFirebaseApp(); // a parent component contains a `FirebaseAppProvider`
  
  // initialize Database and Auth with the normal Firebase SDK functions
  const database = getDatabase(app);
  
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
              <Route path='/teacher' Component={Teacher} />
            </Routes>
          </div>
        </Router>
      </DatabaseProvider>
    </AuthProvider>
  )
 }


export default App
