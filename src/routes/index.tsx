// routes/index.tsx
import DefaultLayout from "../layouts/DefaultLayout";
import AuthLayout from "../layouts/AuthLayout";

import { lazyLoad } from "../shared/utils/router.util";
import JobTicker from "../modules/candidate/Jobs";
import About from "../modules/candidate/About";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import NotFound from "../components/NotFound";
const CandidateRegister = lazyLoad(
  () => import("../modules/candidate/Register")
);
const Login = lazyLoad(() => import("../modules/auth/Login"));
const Player = lazyLoad(() => import("../modules/candidate/Player"));

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<JobTicker />} />
        <Route path="/about" element={<About />} />
        <Route path="/player" element={<Player />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CandidateRegister />} />
      </Route>
    </>
  )
);

export default routes;
