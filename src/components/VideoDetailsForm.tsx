import { FormEvent, useRef } from "react";

interface VideoDetailsFormProps {
  thumbnail: string | undefined;
  onSubmit: (name: string, description: string) => void;
}

export const VideoDetailsForm = ({
  thumbnail,
  onSubmit,
}: VideoDetailsFormProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const title = titleInputRef.current?.value;
    const description = descriptionInputRef.current?.value;

    if (thumbnail == undefined) return;
    if (title == undefined || description == undefined) return;

    onSubmit(title, description);
  }

  return (
    <form onSubmit={handleSubmit} className="w-3/4 space-y-5">
      <div className="flex flex-col gap-3">
        <label htmlFor="title">Title</label>
        <input
          autoFocus
          ref={titleInputRef}
          type="text"
          id="title"
          className="rounded-md border border-gray-600 px-5 py-3"
        />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="desc">Description</label>
        <textarea
          ref={descriptionInputRef}
          id="desc"
          rows={10}
          className="rounded-md border border-gray-600 px-5 py-3"
        ></textarea>
      </div>
      <div className="flex w-full justify-end">
        <button
          type="submit"
          className="rounded-full bg-pink-600 px-5 py-2 text-white disabled:bg-pink-200"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
