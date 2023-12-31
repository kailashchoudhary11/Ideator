import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import UserProfile, {action as userProfileAction, loader as userProfileLoader} from "./pages/UserProfile"
import Login, {action as loginPageAction, loader as loginPageLoader} from "./pages/Login"
import Register, {action as registerPageAction} from "./pages/Register"
import ExploreIdeas, { action as exploreIdeasAction } from "./pages/ExploreIdeas";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route element={<Home />} index />
    <Route action={userProfileAction} element={<UserProfile />} loader={userProfileLoader} path="profile" />
    <Route action={loginPageAction} element={<Login />} loader={loginPageLoader} path="login" />
    <Route action={exploreIdeasAction} element={<ExploreIdeas />} path="ideas" />
    <Route action={registerPageAction} element={<Register />} path="register" />
  </Route>
));

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}