import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home, {loader as homePageLoader} from "./pages/Home"
import UserProfile, {loader as userProfileLoader} from "./pages/UserProfile"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route element={<Home />} index loader={homePageLoader} />
    <Route element={<UserProfile />} path="profile" loader={userProfileLoader} />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}