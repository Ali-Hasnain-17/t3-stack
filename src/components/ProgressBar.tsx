interface ProgressBarProps {
  progress: number;
  width: string;
}

export const ProgressBar = ({ progress, width }: ProgressBarProps) => {
  return (
    <div className={`h-5 rounded border border-gray-500 ${width}`}>
      <div
        className="flex h-full items-center justify-center bg-pink-600 text-sm text-white transition duration-150 ease-in-out"
        style={{ width: `${progress}%` }}
      >
        {progress > 0 && progress}%
      </div>
    </div>
  );
};
