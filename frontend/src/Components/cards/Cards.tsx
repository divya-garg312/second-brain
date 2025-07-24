import Card from "./Card";

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
interface CardsProps {
  contents: Content[];
  setDeleteId: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Cards({ contents, setDeleteId}: CardsProps) {
  return (
    <div className="h-[90vh] grid grid-cols-3 gap-6 overflow-scroll p-4 overflow-x-hidden scrollbar-hide pt-5">
      {contents.map(x => (
        <div key={x._id}>
          <Card data={x} setDeleteId={setDeleteId}/>
        </div>
      ))}
    </div>
  )
}
