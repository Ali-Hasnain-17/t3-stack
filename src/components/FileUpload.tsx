import { useRef, useState } from "react";
import { FileToUpload, FileTypes } from "~/pages/create";
import { FilePreview } from "./FilePreview";
import Link from "next/link";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "config/firebase";
import { ProgressBar } from "./ProgressBar";
import { v4 as uuidv4 } from "uuid";

interface FileUploadProps {
  type: FileTypes;
  uploadPath: string;
  allowCancel?: boolean;
  onUpload: (url: string) => void;
  width?: string;
  height?: string;
}

export const FileUpload = ({
  type,
  uploadPath,
  allowCancel = false,
  onUpload,
  width = "w-1/3",
  height = "h-fit",
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<FileToUpload>({
    file: null,
    localUrl: "",
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  function uploadFile() {
    if (selectedFile.file == undefined || selectedFile.file == null) return;
    setIsUploading(true);
    const storageRef = ref(
      storage,
      `${uploadPath}/${uuidv4()}-${selectedFile.file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, selectedFile.file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(uploadProgress);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        setIsUploading(false);
        const url = await getDownloadURL(storageRef);
        setSelectedFile({
          file: null,
          localUrl: "",
        });
        onUpload(url);
      }
    );
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function selectFile(e: any) {
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e: any) => {
      setSelectedFile({
        file,
        localUrl: e.target.result,
      });
    };
  }

  return (
    <>
      <div
        className={`flex cursor-pointer flex-col items-center justify-around text-ellipsis rounded-md border border-black p-10 ${width} ${height}`}
        onClick={openFilePicker}
      >
        {selectedFile.localUrl !== "" && (
          <FilePreview file={selectedFile} type={type} />
        )}
        {selectedFile.file === null
          ? `No ${type === FileTypes.VIDEO ? "Video" : "Image"} Selected`
          : `${selectedFile.file?.name}`}
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={selectFile}
          accept={type === FileTypes.VIDEO ? "video/mp4" : "image/*"}
        />
      </div>
      {isUploading && <ProgressBar width={width} progress={progress} />}
      <div className={`flex justify-end gap-2 ${width}`}>
        <button
          disabled={selectedFile.file === null || isUploading}
          className="rounded-full bg-pink-600 px-5 py-2 text-white disabled:bg-pink-200"
          onClick={uploadFile}
        >
          Upload
        </button>
        {allowCancel && (
          <Link
            href="/"
            className="rounded-full bg-gray-900 px-5 py-2 text-white"
          >
            Cancel
          </Link>
        )}
      </div>
    </>
  );
};
