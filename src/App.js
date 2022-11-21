import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ComponentWithNav from "./Components/ComponentWithNav";
import Err404 from "./Components/Err404";
import Loading from "./Components/Loading";
import { FeedProvider } from "./Contexts/FeedContext";
import { LoadingContext } from "./Contexts/LoadingContext";
import { UserContext } from "./Contexts/UserContext";
import Auth from "./Routes/Auth";
import Feed from "./Routes/Feed";
import Profile from "./Routes/Profile";

function App() {
  const { loading } = useContext(LoadingContext);
  const { user, userData } = useContext(UserContext);

  // get path from url
  const { pathname, state } = useLocation();

  return (
    <div className="App">
      {loading && (
        // loading screen absolute position
        <Loading />
      )}
      <FeedProvider userData={userData}>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route
            path="/auth"
            element={user ? <Navigate to={state} /> : <Auth />}
          />
          <Route
            path="/feed"
            element={
              user ? (
                <ComponentWithNav>
                  <Feed />
                </ComponentWithNav>
              ) : (
                <Navigate to="/auth" state={pathname} />
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
                <Navigate to="/auth" state={pathname} />
              )
            }
          />
          <Route path="*" element={<Err404 />} />
        </Routes>
      </FeedProvider>
    </div>
  );
}

export default App;
