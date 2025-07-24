import Button from "../common/Button"
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className="h-[10vh] flex justify-between items-center w-full bg-sign-bg px-15 ">
            <div>
                <h1 className="text-3xl text-heading p-4 font-bold">Brainly</h1>
            </div>
                <div className="flex justify-between items-center gap-6">
                    <Button variant={"authSecondary"} size={"md"} text={"Sign Up"} onClick={() => { navigate("/signup") }} />
                    <Button variant={"authPrimary"} size={"md"} text={"Sign In"} onClick={() => { navigate("/signin") }} />
                </div>
        </header>
    )
}
