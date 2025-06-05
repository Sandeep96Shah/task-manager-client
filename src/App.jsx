import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateTask from "./pages/Admin/CreateTask";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import ManageUsers from "./pages/Admin/ManageUsers";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import MyTasks from "./pages/User/MyTasks";
import UserDashboard from "./pages/User/UserDashboard";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/create-task" element={<CreateTask />} />
          <Route path="/admin/tasks" element={<ManageTasks />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={["user"]} />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/tasks" element={<MyTasks />} />
          <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
