import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Attendance from "./pages/Attendance";
import Assignments from "./pages/Assignments";
import Reports from "./pages/Reports";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <div className="main-area">
          <Header />

          <main className="page-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route
  path="/assignments"
  element={<Assignments />}
/>
              <Route path="/reports" element={<Reports />} />
              <Route
  path="/notifications"
  element={<Notifications />}
/>
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;