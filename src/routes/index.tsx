import {
  createBrowserRouter,
  redirect,
  type LoaderFunction,
} from "react-router-dom";
import LoginPage from "../views/loginPage";
import NotFoundPage from "../views/notFound";
import NavigationBar from "../components/navbar/navigationBar";
import AddProduct from "../views/addProduct";
import Home from "../views/home";

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
    path:'/',
    element:<NavigationBar />,
    loader: (() => {
      if (!localStorage.getItem("access_token")) return redirect("/login");
      return null
    }) as LoaderFunction<typeof NavigationBar>,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/add-product',
        element:<AddProduct/>
      }
    ]
  },
  {
    path:'*',
    element:<NotFoundPage />
  }
]);
