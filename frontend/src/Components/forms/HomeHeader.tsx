// import PlusIcon from "../Icons/PlusIcon";
import Button from "../common/Button";
interface HomeHeaderProps {
    setShowForm: (x: boolean) => void;
    typeOfCards:string;
}
export default function HomeHeader({ setShowForm,typeOfCards }: HomeHeaderProps) {
    const header=typeOfCards==="all"? "All Notes":typeOfCards.charAt(0).toUpperCase()+typeOfCards.slice(1)+'s';

    return (
        <div className="w-full h-full p-10 flex justify-between items-center">
            <div className="text-3xl font-bold">{header}</div>
            <div>
                <Button variant={"secondary"} size={"md"} text={"Add Content"} onClick={() => setShowForm(true)} />
            </div>
        </div>
    )
}
