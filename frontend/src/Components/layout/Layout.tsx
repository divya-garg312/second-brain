import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
    return (
        <div>
            <div className="w-screen h-screen">
                <Header />
                <Outlet />
            </div>
        </div>
    )
}
