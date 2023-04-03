import { BrowserRouter, Link, Routes, Route } from "react-router-dom"
import { keepAlive, KeepAlive } from './components/keep-alive';
import { About } from "./pages/about";
import { Home } from "./pages/home";

const AliveHome = keepAlive(Home, 'home');
const AliveAbout = keepAlive(About, 'about');

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <KeepAlive>
          <Routes>
            <Route path={'/'} Component={AliveHome} />
            <Route path={'/about'} Component={AliveAbout} />
          </Routes>
        </KeepAlive>
      </BrowserRouter>
    </div>
  )
}