import {
  createBrowserRouter,
  redirect,
  type LoaderFunction,
} from "react-router-dom";
import LoginPage from "../views/loginPage";
import NotFoundPage from "../views/notFound";

export default createBrowserRouter([
  {
    element: <LoginPage />,
    path: "/login",
    loader: (() => {
      if (localStorage.getItem("access_token")) return redirect("/");
      return null
    }) as LoaderFunction<typeof LoginPage>,
  },
  {
    path:'*',
    element:<NotFoundPage />
  }
]);
