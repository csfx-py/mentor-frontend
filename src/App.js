import { ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ComponentWithNav from "./Components/ComponentWithNav";
import Loading from "./Components/Loading";
import { FeedProvider } from "./Contexts/FeedContext";
import { LoadingContext } from "./Contexts/LoadingContext";
import { UserContext } from "./Contexts/UserContext";
import Auth from "./Routes/Auth";
import Err404 from "./Routes/Err404";
import Feed from "./Routes/Feed";
import Landing from "./Routes/Landing";
import Profile from "./Routes/Profile";
import Search from "./Routes/Search";
import { mentorTheme } from "./Theme";

function App() {
  const { loading } = useContext(LoadingContext);
  const { user, userData } = useContext(UserContext);

  const { pathname, state } = useLocation();

  return (
    <>
      {loading && <Loading />}
      <div
        className="App"
        style={{
          overflow: loading ? "hidden" : "auto",
          height: loading ? "100vh" : "auto",
        }}
      >
        <ThemeProvider theme={mentorTheme}>
          <FeedProvider userData={userData}>
            <Routes>
              <Route
                path="/"
                element={
                  user ? <Navigate to="/feed" state={pathname} /> : <Landing />
                }
              />
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
                path="/search"
                element={
                  user ? (
                    <ComponentWithNav>
                      <Search />
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
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
