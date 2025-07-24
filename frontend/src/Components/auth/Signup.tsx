import { useRef, useState } from "react";
import Button from "../common/Button";
import EyeSlashIcon from "../Icons/EyeSlashIcon";
import EyeIcon from "../Icons/EyeIcon";

export default function Signup() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const username = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const errorDiv = useRef<HTMLDivElement | null>(null);

    interface signupResponse {
        error?: string;
        message?: string;
    }

    async function handleClick(): Promise<void> {
        setLoading(true);
        try {
            const res = await fetch(`https://brainly-backend-kbmk.onrender.com/api/v1/signup`, {
                method: "post",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    username: username.current?.value,
                    password: password.current?.value
                })
            });

            const data: signupResponse = await res.json();

            if (data.error)
                errorDiv.current!.innerText = data.error;
            else
                errorDiv.current!.innerText = data.message || " ";
        } catch (err) {
            console.log(err);
            errorDiv.current!.innerText = "Something went wrong!";
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="h-[90vh] flex items-center justify-center bg-sign-bg">
            <div className="flex flex-col gap-4 p-6 bg-body-bg rounded-lg shadow-md w-[400px] dark:text-white">
                <h1 className="text-4xl font-bold text-center">
                    Welcome to <span className="text-heading">Brainly</span>
                </h1>
                <p className="text-center text-lg text-gray-600 dark:text-subheading">
                    Sign up to access your second brain!
                </p>

                <div className="flex flex-col gap-2">
                    <label htmlFor="username" className="text-lg font-medium">Username</label>
                    <input type="text" id="username" className="bg-input-div rounded-md px-3 py-2 outline-none focus:bg-input-div" placeholder="XYZ" ref={username} />
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="text-lg font-medium">Password</label>
                    <div className="w-full relative flex items-center justify-between">
                        <input type={showPassword ? "text" : "password"} id="password" className="relative w-full bg-input-div rounded-md px-3 py-2 outline-none text-lg" placeholder={!showPassword ? "•••" : "ABC"} ref={password} />
                        <button className="absolute text-subheading right-1" onClick={(e) => { e.preventDefault(); setShowPassword(t => !t) }}>
                            {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
                        </button>
                    </div>
                </div>

                <Button
                    variant={"submitSecondary"}
                    text={loading ? "Loading..." : "Sign up"}
                    size={"md"}
                    onClick={handleClick}
                />

                <div ref={errorDiv} className="text-md text-subheading h-2"></div>
            </div>
        </main>
    );
}
