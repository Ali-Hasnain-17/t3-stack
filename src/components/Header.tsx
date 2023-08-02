import { useSession } from "next-auth/react";
import ProfileImage from "./ProfileImage";
import Link from "next/link";
import { SearchInput } from "./SearchInput";
import { FaPlay } from "react-icons/fa";
import { MdOutlineVideoCall } from "react-icons/md";

export const Header = () => {
  const session = useSession();
  const user = session.data?.user;

  return (
    <header className="flex items-center justify-around border-b border-gray-700 px-10 py-5">
      <Link
        href="/"
        className="flex items-center gap-2 text-2xl capitalize tracking-widest text-pink-800"
      >
        <div className="flex items-center justify-center rounded-full border-4 border-pink-800 p-2">
          <FaPlay size={20} />
        </div>
        <span>VideoHub</span>
      </Link>
      <SearchInput />
      <div className="flex gap-3">
        {user != null && (
          <Link href="/create">
            <MdOutlineVideoCall size={30} />
          </Link>
        )}
        <Link href="profile">
          <ProfileImage src={user?.image} />
        </Link>
      </div>
    </header>
  );
};
