import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home, {loader as homePageLoader} from "./pages/Home"
import Login, {action as loginPageAction} from "./pages/Login"
import Register, {action as registerPageAction} from "./pages/Register"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route element={<Home />} index loader={homePageLoader} />
    <Route action={loginPageAction} element={<Login />} path="/login" />
    <Route action={registerPageAction} element={<Register />} path="/register" />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}