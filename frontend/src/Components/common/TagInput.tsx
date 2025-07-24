interface TagInputProps {
    tags: string[];
    tagsInput: React.RefObject<HTMLInputElement | null>;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    removeTag: (index: number) => void;
}

export default function TagInput({ tags, tagsInput, handleKeyDown, removeTag }: TagInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">Tags</label>
            <div className="flex flex-wrap gap-2 p-2 min-h-[40px] rounded bg-input-div">
                {tags.map((tag, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                        <span>{tag}</span>
                        <button
                            className="ml-2 text-red-500 font-bold"
                            onClick={() => removeTag(index)}
                        >
                            x
                        </button>
                    </div>
                ))}
                <input
                    type="text"
                    ref={tagsInput}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-w-[100px] focus:outline-none bg-input-bg"
                    placeholder="Type tag and press enter"
                />
            </div>
        </div>
    );
}
