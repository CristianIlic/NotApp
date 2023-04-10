import Navbar from './components/Navbar'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import './styles/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/signup' Component={SignUp} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
