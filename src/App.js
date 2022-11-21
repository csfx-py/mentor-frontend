import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import "./App.css";
import Err404 from "./Assets/404.jpeg";
import ComponentWithNav from "./Components/ComponentWithNav";
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
              element={
                user ? (
                  <ComponentWithNav>
                    <Feed />
                  </ComponentWithNav>
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route
              path="/profile"
              element={
                user ? (
                  <ComponentWithNav>
                    <Profile />
                  </ComponentWithNav>
                ) : (
                  <Navigate to="/auth" />
                )
              }
            />
            <Route path="*" element={<Err404 />} />
          </Routes>
        </FeedProvider>
      </Router>
    </div>
  );
}

export default App;
