import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Redirection from './pages/Redirection'
import Homefr from './pages/Homefr'
import Homeen from './pages/Homeen'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Error from './pages/Error';

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Redirection/>} />
				<Route path="/fr" element={<Homefr/>} />
				<Route path="/en" element={<Homeen/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/admin" element={<Admin/>} />
				<Route path="/*" element={<Error/>} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;