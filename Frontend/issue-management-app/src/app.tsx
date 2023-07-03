import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@asgardeo/auth-react";
import { authConfig } from "./configs/auth-config";
import { LoginPage } from "./pages/login-page";
import { ProtectedRoute } from "./routes/protected-route";
import { AccessControlProvider } from "./providers/access-control-provider/access-control-provider";
import { Dashboard } from "./layout/dashboard";

function App() {
  return (
    <div className="App">
      <AuthProvider config={authConfig}>
        <AccessControlProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/issues"
                element={
                  <ProtectedRoute component={<Dashboard />} redirectPath="/" />
                }
              />
            </Routes>
          </Router>
        </AccessControlProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
