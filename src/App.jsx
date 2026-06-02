import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Web3Provider, useWeb3 } from "./context/Web3Context";
// import { WalletProvider } from "../context/walletContext";
import Home from "./components/home/Home";   // ✅ TERA MAIN HOMEPAGE
// import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import CyclePage from "./pages/CyclePage";
import WalletPage from "./pages/WalletPage";
import TeamPage from "./pages/TeamPage";
import GenerationPage from "./pages/GenerationPage";
import RankPage from "./pages/RankPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TelegramFloat from "./context/TelegramFloat";


// 🔒 Protected Route
function ProtectedRoute({ children }) {
  const { account, loading } = useWeb3();

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </div>
    );
  }

  if (!account) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function AppRoutes() {
  const { account } = useWeb3();
  return (
    <>
      <Routes>

        {/* ✅ MAIN HOMEPAGE */}
        <Route path="/" element={<Home />} />

        {/* Optional Signin page */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />



        {/* 🔐 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/cycle"
          element={
            <ProtectedRoute>
              <CyclePage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <WalletPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/team"
          element={
            <ProtectedRoute>
              <TeamPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/generation"
          element={
            <ProtectedRoute>
              <GenerationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rank"
          element={
            <ProtectedRoute>
              <RankPage />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />


      </Routes>
      {/* //telegram link  */}
      {account && <TelegramFloat />}
    </>
  );
}

function App() {
  return (
    <Web3Provider>
      <Router>
        <AppRoutes />

        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="dark"
        />

      </Router>
    </Web3Provider>
  );
}

export default App;
