import { RouterProvider } from "react-router-dom";
import router from "./pages/router/Routes";

function App() {
    return (
        <div className="App min-h-screen font-main text-lg text-black">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
