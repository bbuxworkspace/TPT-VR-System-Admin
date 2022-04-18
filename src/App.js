import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { LoginPage, DashboardPage } from "./views";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import PlayerListPage from "./views/PlayerListPage/PlayerListPage";
import { useEffect } from "react";
import setAuthToken from "./utils/setAuthToken";
import PlayerDetailsPage from "./views/PlayerDetailsPage/PlayerDetailsPage";
import TeamListPage from "./views/TeamListPage/TeamListPage";
import TeamDetailsPage from "./views/TeamDetailsPage/TeamDetailsPage";
import AddTeamPage from "./views/AddTeamPage/AddTeamPage";
import EditTeamPage from "./views/EditTeamPage/EditTeamPage";
import EditPlayerPage from "./views/EditPlayerPage/EditPlayerPage";
import { connect, useDispatch } from "react-redux";
import { getRefreshToken } from "./actions/Dashboard.action";
import CategoryPage from "./views/CategoryPage/CategoryPage";
import AddCategory from "./views/AddCategory/AddCategory";
import "./App.css";
import SubCategoryPage from "./views/SubCategoryPage/SubCategoryPage";
import AddSubCategory from "./views/AddSubCategory/AddSubCategory";
import AuthorPage from "./views/AuthorPage/AuthorPage";
import AddAuthorPage from "./views/AddAuthorPage/AddAuthorPage";
import PublisherPage from "./views/PublisherPage/PublisherPage";
import AddPublisherPage from "./views/AddPublisherPage/AddPublisherPage";
import BookPage from "./views/BookPage/BookPage";

function App({ getRefreshToken }) {
  useEffect(() => {
    if (localStorage.getItem("token_book")) {
      setAuthToken(localStorage.getItem("token_book"));
    }
    getRefreshToken();
  }, [getRefreshToken]);

  return (
    <>
      <ToastContainer newestOnTop theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="books" element={<BookPage />} />
              <Route path="category" element={<CategoryPage />} />
              <Route path="author" element={<AuthorPage />} />
              <Route path="publisher" element={<PublisherPage />} />
              <Route path="author/add" element={<AddAuthorPage />} />
              <Route path="publisher/add" element={<AddPublisherPage />} />
              <Route path="author/:id/edit" element={<AddAuthorPage edit />} />
              <Route
                path="publisher/:id/edit"
                element={<AddPublisherPage edit />}
              />
              <Route path="category/add" element={<AddCategory />} />
              <Route
                path="category/:id/edit"
                element={<AddCategory edit={true} />}
              />
              <Route path="category/:catId" element={<SubCategoryPage />} />
              <Route
                path="subcategory/add/:catId"
                element={<AddSubCategory />}
              />
              <Route
                path="subcategory/:id/edit"
                element={<AddSubCategory edit={true} />}
              />
              <Route path="players" element={<PlayerListPage />} />
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

export default connect(null, { getRefreshToken })(App);
