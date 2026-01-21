import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import WorksPage from "../pages/WorksPage";
import ProjectDetail from "../pages/ProjectDetail";
import AppLayout from "../layout/AppLayout";

function AppRoutes(){
    return(
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/works" element={<WorksPage />} />
                <Route path="/projects/:projectId" element={<ProjectDetail />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;