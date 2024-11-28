import { createBrowserRouter } from "react-router-dom";
import Layout from "../layouts/Layout";
import Home from "../pages/Home";
import Bookmark from "../pages/Bookmark";
import ChangePassword from "../pages/ChangePassword";
import DeleteAccount from "../pages/DeleteAccount";
import FindId from "../pages/FindId";
import FindPassword from "../pages/FindPassword";
import MyPage from "../pages/MyPage";
import Note from "../pages/Note";
import Resume from "../pages/Resume";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/bookmark",
        element: <Bookmark />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/delete-account",
        element: <DeleteAccount />,
      },
      {
        path: "/find-id",
        element: <FindId />,
      },
      {
        path: "/find-password",
        element: <FindPassword />,
      },
      {
        path: "/my-page",
        element: <MyPage />,
      },
      {
        path: "/note",
        element: <Note />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);
