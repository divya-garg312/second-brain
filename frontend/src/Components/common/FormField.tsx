
interface FormFieldProps {
    label: string;
    inputRef: React.RefObject<HTMLInputElement | null>;
    type: string;
}

export default function FormField({ label, inputRef, type }: FormFieldProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">{label}</label>
            <input
                type={type}
                ref={inputRef}
                className="bg-input-div rounded-md px-3 py-2 outline-none focus:bg-input-div"
            />
        </div>
    );
}
