import { useRef, useState } from "react";
import CloseIcon from "../Icons/CloseIcon";
import Button from "../common/Button";
import FormField from "../common/FormField";
import TagInput from "../common/TagInput";

interface HomeHeaderProps {
  setShowForm: (x: boolean) => void;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddContentForm({ setShowForm, setFlag }: HomeHeaderProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const tagsInput = useRef<HTMLInputElement | null>(null);
  const titleInput = useRef<HTMLInputElement | null>(null);
  const typeInput = useRef<HTMLSelectElement | null>(null);
  const linkInput = useRef<HTMLInputElement | null>(null);
  const errorDiv = useRef<HTMLDivElement | null>(null);

  function handleTagKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      setTags([...tags, tagsInput.current!.value]);
      tagsInput.current!.value = "";
    }
  }

  function removeTag(index: number) {
    setTags(tags.filter((_, i) => i !== index));
  }

  async function handleClick() {
    if (
      tags.length === 0 ||
      titleInput.current!.value === '' ||
      typeInput.current!.value === '' ||
      linkInput.current!.value === ''
    ) {
      errorDiv.current!.innerText = "All fields should be filled";
      return;
    }

    setLoading(true);

    try {
      const obj = {
        title: titleInput.current!.value,
        link: linkInput.current!.value,
        tags: tags,
        type: typeInput.current!.value
      };

      const res = await fetch("https://brainly-backend-kbmk.onrender.com/api/v1/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem("authorization")!
        },
        body: JSON.stringify(obj),
      });

      const da = await res.json();
      errorDiv.current!.innerText = da.error || da.message;
      setFlag((prev) => !prev);
    } catch (err) {
      console.log(err);
      errorDiv.current!.innerText = "Something went wrong!";
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="flex flex-col gap-4 p-6 bg-body-bg rounded-lg shadow-md w-[400px] dark:text-white relative">

        <div>
          <h1 className="text-heading text-3xl">Add Content</h1>
        </div>

        <div className="absolute top-0 right-0 p-3 cursor-pointer" onClick={() => setShowForm(false)}>
          <CloseIcon />
        </div>

        <FormField label="Title" inputRef={titleInput} type="text" />

        <div className="flex flex-col gap-2">
          <label className="text-lg font-medium">Type</label>
          <select
            className="bg-input-div rounded-md px-3 py-2 outline-none focus:bg-input-div border-none"
            ref={typeInput}
          >
            <option value="">Select type</option>
            <option value="tweet">Tweet</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
            <option value="link">Link</option>
          </select>
        </div>

        <FormField label="Link" inputRef={linkInput} type="text" />

        <TagInput
          tags={tags}
          tagsInput={tagsInput}
          handleKeyDown={handleTagKeyDown}
          removeTag={removeTag}
        />

        <Button
          variant={"submitSecondary"}
          text={loading ? "Loading..." : "Submit"}
          size={"md"}
          className={"mt-4"}
          onClick={handleClick}
        />

        <div ref={errorDiv} className="text-md text-subheading h-2"></div>
      </div>
    </div>
  );
}
