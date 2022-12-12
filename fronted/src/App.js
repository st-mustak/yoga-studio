import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './bootstrap.min.css';
import Header from './components/Header';
import RegisterForm from './components/RegisterForm';
import LoginPage from './components/LoginPage';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import About from './components/About';
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import PaymentPage from './components/PaymentPage';
import './yoga.css';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
     <Header/>
     <main>
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/payment" element={<PaymentPage />} />
      </Routes>
     </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;