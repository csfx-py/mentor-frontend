import { Typography } from "@mui/material";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Err404 from "./Assets/404.jpeg";
import Loading from "./Components/Loading";
import { FeedProvider } from "./Contexts/FeedContext";
import { LoadingContext } from "./Contexts/LoadingContext";
import { UserContext } from "./Contexts/UserContext";
import Auth from "./Routes/Auth";
import Feed from "./Routes/Feed";
import Profile from "./Routes/Profile";

function App() {
  // eslint-disable-next-line no-unused-vars
  const { loading, setLoading } = useContext(LoadingContext);
  const { user, userData } = useContext(UserContext);

  return (
    <div className="App">
      {loading && (
        // loading screen absolute position
        <Loading />
      )}
      <Router>
        <FeedProvider userData={userData}>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route
              path="/auth"
              element={user ? <Navigate to="/feed" /> : <Auth />}
            />
            <Route
              path="/feed"
              element={user ? <Feed /> : <Navigate to="/auth" />}
            />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/auth" />}
            />
            <Route
              path="*"
              element={
                <div
                  style={{
                    height: "100vh",
                    background:
                      "linear-gradient(135deg, #FFEB3B 0%, #ffffff 100%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    src={Err404}
                    alt="404"
                    style={{
                      maxHeight: "100vh",
                      minHeight: "40vh",
                    }}
                  />
                  <Typography variant="h4" align="center">
                    404 - Page Not Found
                  </Typography>
                </div>
              }
            />
          </Routes>
        </FeedProvider>
      </Router>
    </div>
  );
}

export default App;
