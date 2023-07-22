import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home, {loader as homePageLoader} from "./pages/Home"
import UserProfile, {action as userProfileAction, loader as userProfileLoader} from "./pages/UserProfile"
import Login, {action as loginPageAction} from "./pages/Login"
import Register, {action as registerPageAction} from "./pages/Register"
import ExploreIdeas, {action as exploreIdeasAction, loader as exploreIdeasLoader} from "./pages/ExploreIdeas"

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route element={<Home />} index loader={homePageLoader} />
    <Route action={userProfileAction} element={<UserProfile />} loader={userProfileLoader} path="profile" />
    <Route action={exploreIdeasAction} element={<ExploreIdeas />} loader={exploreIdeasLoader} path="ideas" />
    <Route action={loginPageAction} element={<Login />} path="login" />
    <Route action={registerPageAction} element={<Register />} path="register" />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}