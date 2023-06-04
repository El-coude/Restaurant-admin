import { RouterProvider } from "react-router-dom";
import router from "./pages/router/Routes";

function App() {
    return (
        <div className="App min-h-screen font-main text-lg text-slate-900">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
