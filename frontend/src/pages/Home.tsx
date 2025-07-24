import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "../Components/forms/HomeHeader";
import Sidebar from "../Components/layout/Sidebar";
import AddContentForm from "../Components/forms/AddContentForm";
import Cards from "../Components/cards/Cards";

interface Tag {
  _id: string;
  title: string;
}

interface User {
  _id: string;
  username: string;
}

export interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
  tags: Tag[];
  userId: User;
  __v: number;
}

export default function Home() {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [contents, setContents] = useState<Content[]>([]);
  const [filteredContents, setFilteredContents] = useState<Content[]>([]);
  const location = useLocation();
  const [deleteId,setDeleteId]=useState(true);
  const [flag,setFlag]=useState<boolean>(true);

  const getTypeFromRoute = () => {
    const path = location.pathname;
    if (path === "/tweets") return "tweet";
    if (path === "/videos") return "video";
    if (path === "/documents") return "document";
    if (path === "/links") return "link";
    return "all";
  };

  const typeOfCards = getTypeFromRoute();
console.log(deleteId);
  useEffect(() => {
    const fetchContents = async () => {
      const res = await fetch("https://brainly-backend-kbmk.onrender.com/api/v1/content", {
        method: "get",
        headers: {
          "authorization": localStorage.getItem("authorization")!
        }
      })
      const data = await res.json();
      setContents(data.content);
      setFilteredContents(data.content);
    }
    fetchContents();
  }, [deleteId,flag])

  useEffect(() => {
    if (typeOfCards === "all") {
      setFilteredContents(contents);
    } else {
      setFilteredContents(contents.filter(content => content.type === typeOfCards));
    }
  }, [contents, typeOfCards])

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-[23vw]">
        <Sidebar currentType={typeOfCards} />
      </div>
      <div className="relative h-full flex-1 bg-sign-bg text-normal-color">
        <div className="h-[10vh]">
          <HomeHeader setShowForm={setShowForm} typeOfCards={typeOfCards}/>
        </div>
        {showForm && <AddContentForm setShowForm={setShowForm} setFlag={setFlag}/>}
        <Cards contents={filteredContents} setDeleteId={setDeleteId}/>
      </div>
    </div>
  )
}