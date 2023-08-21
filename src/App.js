import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./Component/Main";
import "./App.scss";
import NotFound from "./Component/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/chats/*" element={<Main />}/>
          <Route path="/" element={<Navigate to="/chats" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
