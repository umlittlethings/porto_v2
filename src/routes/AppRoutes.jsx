import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AppLayout from "../layout/AppLayout";

function AppRoutes(){
    return(
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    );
}
export default AppRoutes;