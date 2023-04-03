import { BrowserRouter, Link, Routes, Route } from "react-router-dom"

const AliveHome = () => <span>home</span>;
const AliveAbout = () => <span>about</span>;

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <Routes>
          <Route path={'/'} Component={AliveHome} />
          <Route path={'/about'} Component={AliveAbout} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}