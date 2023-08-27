import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Redirection from './pages/Redirection'
import Homefr from './pages/Homefr'
import Homeen from './pages/Homeen'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Error from './pages/Error';

import RequireAuth from './config/RequireAuth';
import { ThemeProvider } from './utils/context/ThemeContext';

function Router() {

	return (
		<BrowserRouter>
			<ThemeProvider>
				<Routes>
					<Route path="/" element={<Redirection/>} />
					<Route path="/fr" element={<Homefr/>} />
					<Route path="/en" element={<Homeen/>} />
					<Route path="/login" element={<Login/>} />
					<Route element={<RequireAuth/>}>
						<Route path="/admin" element={<Admin/>} />
					</Route>
					<Route path="/*" element={<Error/>} />
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default Router;