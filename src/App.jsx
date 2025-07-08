import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Feedback from './components/Feedback'

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/focus" element={<Dashboard />} />
        </Routes>
                <Feedback />
      </Layout>
    </Router>
  )
}

export default App
