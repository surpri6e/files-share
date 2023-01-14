import DownloadPage from "../pages/DownloadPage";
import InstructionPage from "../pages/InstructionPage";
import MainPage from "../pages/MainPage";
import { IRoute } from "../types/IRoute";

export const publicRoutes: IRoute[] = [
    {path: '/', component: MainPage},
    {path: '/main', component: MainPage},
    {path: '/download/:id', component: DownloadPage},
    {path: '/instruction', component: InstructionPage}
]