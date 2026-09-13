import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Welcome from './pages/Welcome';
import OwnerListPage from './pages/owners/OwnerListPage';
import OwnerDetailsPage from './pages/owners/OwnerDetailsPage';
import OwnerFormPage from './pages/owners/OwnerFormPage';
import PetFormPage from './pages/pets/PetFormPage';
import VisitsPage from './pages/visits/VisitsPage';
import VetListPage from './pages/vets/VetListPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="owners" element={<OwnerListPage />} />
          <Route path="owners/details/:ownerId" element={<OwnerDetailsPage />} />
          <Route path="owners/new" element={<OwnerFormPage />} />
          <Route path="owners/:ownerId/edit" element={<OwnerFormPage />} />
          <Route path="owners/:ownerId/new-pet" element={<PetFormPage />} />
          <Route path="owners/:ownerId/pets/:petId" element={<PetFormPage />} />
          <Route path="owners/:ownerId/pets/:petId/visits" element={<VisitsPage />} />
          <Route path="vets" element={<VetListPage />} />
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
