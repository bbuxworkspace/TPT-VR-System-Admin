import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { LoginPage, DashboardPage } from "./views";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import AddPlayerPage from "./views/AddPlayerPage/AddPlayerPage";
import PlayerListPage from "./views/PlayerListPage/PlayerListPage";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import PlayerDetailsPage from "./views/PlayerDetailsPage/PlayerDetailsPage";
import TeamListPage from "./views/TeamListPage/TeamListPage";
import TeamDetailsPage from "./views/TeamDetailsPage/TeamDetailsPage";
import AddTeamPage from "./views/AddTeamPage/AddTeamPage";
import EditTeamPage from "./views/EditTeamPage/EditTeamPage";
import EditPlayerPage from "./views/EditPlayerPage/EditPlayerPage";
import { useDispatch } from "react-redux";
import { getRefreshToken } from "./actions/Dashboard.action";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRefreshToken());
  }, []);

  return (
    <>
      <ToastContainer newestOnTop theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="players" element={<PlayerListPage />} />
              <Route path="players/add-player" element={<AddPlayerPage />} />
              <Route path="players/:id/edit" element={<EditPlayerPage />} />
              <Route path="players/:id" element={<PlayerDetailsPage />} />
              <Route path="team" element={<TeamListPage />} />
              <Route path="team/add-team" element={<AddTeamPage />} />
              <Route path="team/:id/edit" element={<EditTeamPage />} />
              <Route path="team/:id" element={<TeamDetailsPage />} />
            </>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
