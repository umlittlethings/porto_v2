import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import WorksPage from "../pages/WorksPage";
import ProjectDetail from "../pages/ProjectDetail";
import SandboxPage from "../pages/SandboxPage";
import UIBuilderPage from "../pages/sandbox/UIBuilderPage";
import CssLabPage from "../pages/sandbox/CssLabPage";
import AlgorithmPage from "../pages/sandbox/AlgorithmPage";
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
                <Route path="/sandbox" element={<SandboxPage />} />
                <Route path="/sandbox/ui-builder" element={<UIBuilderPage />} />
                <Route path="/sandbox/css-lab" element={<CssLabPage />} />
                <Route path="/sandbox/algorithm" element={<AlgorithmPage />} />
            </Route> 
        </Routes>
        </>
    );
}
export default AppRoutes;