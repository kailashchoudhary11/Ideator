import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home, {loader as homePageLoader} from "./pages/Home"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route element={<Home />} index loader={homePageLoader} />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}