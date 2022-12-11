import { ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import ComponentWithNav from "./Components/ComponentWithNav";
import Loading from "./Components/Loading";
import { AdminProvider } from "./Contexts/AdminContext";
import { FeedProvider } from "./Contexts/FeedContext";
import { LoadingContext } from "./Contexts/LoadingContext";
import { UserContext } from "./Contexts/UserContext";
import AdminsTags from "./Routes/AdminsTags";
import Auth from "./Routes/Auth";
import Err404 from "./Routes/Err404";
import Feed from "./Routes/Feed";
import Landing from "./Routes/Landing";
import Profile from "./Routes/Profile";
import Search from "./Routes/Search";
import { mentorTheme } from "./Theme";

function App() {
  const { loading } = useContext(LoadingContext);
  const { user, role, userData } = useContext(UserContext);

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
            <AdminProvider userData={userData}>
              <Routes>
                <Route
                  path="/"
                  element={
                    user ? (
                      <Navigate to="/feed" state={pathname} />
                    ) : (
                      <Landing />
                    )
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
                <Route
                  path="/admin/posts"
                  element={
                    role === "admin" ? (
                      <ComponentWithNav>
                        <>Admin Posts</>
                      </ComponentWithNav>
                    ) : (
                      <Navigate to="/404" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/admin/tags"
                  element={
                    role === "admin" ? (
                      <ComponentWithNav>
                        <AdminsTags />
                      </ComponentWithNav>
                    ) : (
                      <Navigate to="/404" state={pathname} />
                    )
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    role === "admin" ? (
                      <ComponentWithNav>
                        <>Admin Users</>
                      </ComponentWithNav>
                    ) : (
                      <Navigate to="/404" state={pathname} />
                    )
                  }
                />
                <Route
                  path="*"
                  element={
                    state?.startsWith("/admin") && role === "admin" ? (
                      <Navigate to={state} />
                    ) : (
                      <Err404 />
                    )
                  }
                />
              </Routes>
            </AdminProvider>
          </FeedProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
