import DownloadPage from './pages/DownloadPage';
import MainPage from './pages/MainPage';
import { IRoute } from './types/IRoute';

export const publicRoutes: IRoute[] = [
   { path: '/', component: MainPage },
   { path: '/download/:id', component: DownloadPage },
];
