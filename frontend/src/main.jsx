
// Import the necessary modules from the React and ReactDOM libraries
import ReactDOM from 'react-dom/client'
// Import the root component of your application (App.jsx)
import App from './App.jsx'
// Import the CSS file for styling
import './index.css'
// Import the BrowserRouter component from 'react-router-dom' for routing
import { BrowserRouter } from 'react-router-dom'

// Render the root component (App) wrapped in BrowserRouter to enable routing
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
