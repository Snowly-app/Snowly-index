import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import './styles/globals.css';

const App = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-background selection:bg-primary/30">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
