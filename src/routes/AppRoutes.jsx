import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import WorksPage from "../pages/WorksPage";
import ProjectDetail from "../pages/ProjectDetail";
import AppLayout from "../layout/AppLayout";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes(){
    return(
        <>
        <ScrollToTop />
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/works" element={<WorksPage />} />
                <Route path="/works/:projectId" element={<ProjectDetail />} />
            </Route> 
        </Routes>
        </>
    );
}
export default AppRoutes;