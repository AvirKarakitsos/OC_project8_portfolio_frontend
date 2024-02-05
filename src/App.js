import Home from './pages/Home'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Error from './pages/Error';
// import RequireAuth from './config/RequireAuth';

import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ThemeProvider } from './utils/context/ThemeContext';
import { LanguageProvider } from './utils/context/LanguageContext';

function Router() {

	return (
		<BrowserRouter>
			<ThemeProvider>
				<LanguageProvider>
					<Routes>
						<Route path="/" element={<Home/>} />
						<Route path="/login" element={<Login/>} />
						{/* <Route element={<RequireAuth/>}> */}
							<Route path="/admin" element={<Admin/>} />
						{/* </Route> */}
						<Route path="/*" element={<Error/>} />
					</Routes>
				</LanguageProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default Router;