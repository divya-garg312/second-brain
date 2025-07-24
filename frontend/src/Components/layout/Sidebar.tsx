import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import DocumentIcon from '../Icons/DocumentIcon';
import LinkIcon from '../Icons/LinkIcon';
import TweetIcon from '../Icons/TweetIcon';
import VideoIcon from '../Icons/VideoIcon';
import brainlyLogo from "../img/brainly.png";
import Button from '../common/Button';

interface SidebarProps {
    currentType: string;
}

export default function Sidebar({ currentType }: SidebarProps) {
    const navigate = useNavigate();

    interface NavInterface {
        icon: ReactElement,
        title: string,
        type: string,
        route: string
    }

    function logoutUser() {
        const token = localStorage.getItem("authorization")
        if (token) {
            localStorage.removeItem("authorization");
            navigate("/signin");
        }
    }

    const navBtns: NavInterface[] = [
        { icon: <TweetIcon />, title: "Tweets", type: "tweet", route: "/tweets" }, 
        { icon: <VideoIcon />, title: "Videos", type: "video", route: "/videos" }, 
        { icon: <DocumentIcon />, title: "Documents", type: "document", route: "/documents" }, 
        { icon: <LinkIcon />, title: "Links", type: "link", route: "/links" }
    ];

    return (
        <div className='w-full h-full bg-white dark:bg-sign-bg shadow-lg border-r border-gray-200 dark:border-gray-700 relative'>
            <div 
                className={`flex items-center p-4 pt-6 gap-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${currentType === "all" ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                onClick={() => navigate("/")}
            >
                <img src={brainlyLogo} alt="Brainly Logo" className="w-8 h-8" />
                <div className='text-2xl font-bold text-gray-800 dark:text-white'>
                    Second Brain
                </div>
            </div>
            <nav className='p-4 space-y-2'>
                {navBtns.map((navEl: NavInterface, i: number) => (
                    <div 
                        className={`flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer ${currentType === navEl.type ? "bg-gray-100 dark:bg-gray-800" : ""}`}
                        onClick={() => navigate(navEl.route)} 
                        key={i}
                    >
                        <div className='text-gray-600 dark:text-gray-400'>
                            {navEl.icon}
                        </div>
                        <p className='text-gray-700 dark:text-gray-300 font-medium'>
                            {navEl.title}
                        </p>
                    </div>
                ))}
            </nav>
            <div className='absolute bottom-2 p-5'>
                <Button variant={"secondary"} size={"md"} text={"Logout"} onClick={() => logoutUser()} />
            </div>
        </div>
    )
}