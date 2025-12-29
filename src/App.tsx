import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Overview from './pages/Overview';
import BrandAnalysis from './pages/BrandAnalysis';
import Roadmap from './pages/Roadmap';
import SpaceDesign from './pages/SpaceDesign';
import PitchDeck from './pages/PitchDeck';
import Accounting from './pages/Accounting';
import SocialNetwork from './pages/SocialNetwork';

function App() {
    return (
        <Router>
            <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                {/* Dashboard Routes */}
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="analysis" element={<BrandAnalysis />} />
                    <Route path="roadmap" element={<Roadmap />} />
                    <Route path="space" element={<SpaceDesign />} />
                    <Route path="pitch" element={<PitchDeck />} />
                    <Route path="accounting" element={<Accounting />} />
                    <Route path="network" element={<SocialNetwork />} />
                    <Route path="settings" element={<div className="text-white p-4">Ayarlar sayfası yapım aşamasında...</div>} />
                </Route>

                {/* Default Redirect */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
