import { Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Err404 from "./Assets/404.jpeg";
import Auth from "./Routes/Auth";
import Feed from "./Routes/Feed";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/feed" element={<Feed />} />
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
      </Router>
    </div>
  );
}

export default App;
