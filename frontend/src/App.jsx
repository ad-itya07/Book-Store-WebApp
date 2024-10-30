import { BrowserRouter, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const location = useLocation();
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {location.pathname !== "/login" &&
            location.pathname !== "/register" &&
            location.pathname !== "/checkout" && <Navbar />}
          <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6 font-primary">
            <Outlet />
          </main>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
