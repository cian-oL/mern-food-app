import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout>Home page</Layout>} />
      <Route
        path="/user-profile"
        element={<Layout>User profile page</Layout>}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
export default AppRoutes;
