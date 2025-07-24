import ReactPlayer from 'react-player'
import { Tweet } from 'react-tweet';
import VideoIcon from '../Icons/VideoIcon';
import TweetIcon from '../Icons/TweetIcon';
import DeleteIcon from '../Icons/DeleteIcon';
import LinkIcon from '../Icons/LinkIcon';
import DocumentIcon from '../Icons/DocumentIcon';

interface Tag {
    _id: string;
    title: string;
}

interface User {
    _id: string;
    username: string;
}

interface Content {
    _id: string;
    title: string;
    link: string;
    type: string;
    tags: Tag[];
    userId: User;
    __v: number;
}

interface CardProps {
    data: Content;
    setDeleteId: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Card({ data,setDeleteId }: CardProps) {
    let tweetId = "";
    if (data.type == "tweet") {
        const t = data.link.split("/");
        tweetId = t[t.length - 1];
    }
    async function handleDelete(contentId: string) {
        setDeleteId(prev=>!prev);
        const res = await fetch("https://brainly-backend-kbmk.onrender.com/api/v1/content", {
            method: "delete",
            headers: {
                "content-type": "application/json",
                "authorization": localStorage.getItem("authorization")!,
            },
            body: JSON.stringify({ contentId }),
        })
        const a = await res.json();
        console.log(a);
    }
    return (
        <div className="bg-white dark:bg-body-bg h-[350px] overflow-scroll scrollbar-hide p-4 rounded-md shadow">
            <div className="mb-4 flex gap-3 justify-between items-center">
                <div className='flex gap-4'>
                    {data.type === "video" && <VideoIcon />}
                    {data.type === "tweet" && <TweetIcon />}
                    {data.type === "link" && <LinkIcon />}
                    {data.type === "document" && <DocumentIcon />}
                    <h1 className="text-normal-color text-xl font-medium">{data.title}</h1>
                </div>
                <div onClick={() => handleDelete(data._id)} className='cursor-pointer'>
                    <DeleteIcon />
                </div>
            </div>
            <div className='flex justify-center items-start'>
                {data.type === "video" &&
                    <div className="w-full max-w-sm pb-5 pt-3">
                        <div className="w-full rounded overflow-hidden">
                            <ReactPlayer
                                src={data.link}
                                controls={true}
                                width="100%"
                            />
                        </div>
                    </div>
                }
                {data.type === "tweet" &&
                    <div className="w-full max-w-sm">
                        <div>
                            <Tweet id={tweetId} />
                        </div>
                    </div>
                }
                {data.type === "link"||data.type ==="document" &&
                    <div className="w-full max-w-sm">
                        <div>
                            <a href={data.link} target='_blank' className='text-secondary-btn-bg underline'>{data.link}</a>
                        </div>
                    </div>
                }
            </div>
            <div className='flex items-center wrap'>
                {data.tags.map((tag => (
                    <p key={tag._id} className={`bg-primary-btn-bg text-primary-btn-text rounded-md p-1 ${data.type==="link" && "mt-5"}`}># {tag.title}</p>
                )))}
            </div>
        </div>
    )
}