import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineVideoCall } from "react-icons/md";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";

export const SideNav = () => {
  const path = usePathname();
  const session = useSession();
  const user = session.data?.user;

  return (
    <nav className="sticky top-0 bg-pink-400 py-5">
      <ul className="flex flex-col gap-5 whitespace-nowrap">
        <li className="w-full list-none">
          <Link
            href="/"
            className={`flex gap-3 px-10 py-3 text-xl hover:bg-black hover:text-white focus:bg-black focus:text-white ${
              path === "/" ? "bg-black text-white" : ""
            }`}
          >
            <VscHome size={30} />
            <span className="hidden md:inline">Home</span>
          </Link>
        </li>
        <li className="w-full list-none">
          <Link
            href="/profile"
            className={`flex gap-3 px-10 py-3 text-xl hover:bg-black hover:text-white focus:bg-black focus:text-white ${
              path === "/profile" ? "bg-black text-white" : ""
            }`}
          >
            <VscAccount size={30} />
            <span className="hidden md:inline">Profile</span>
          </Link>
        </li>
        {user != null && (
          <li className="w-full list-none">
            <Link
              href="/create"
              className={`flex gap-3 px-10 py-3 text-xl hover:bg-black hover:text-white focus:bg-black focus:text-white ${
                path.includes("/create") ? "bg-black text-white" : ""
              }`}
            >
              <MdOutlineVideoCall size={30} />
              <span className="hidden md:inline">Create</span>
            </Link>
          </li>
        )}
        <li className="w-full list-none">
          {user != null ? (
            <button
              onClick={() => signOut()}
              className="flex w-full gap-3 px-10 py-3 text-xl hover:bg-black hover:text-white focus:bg-black focus:text-white"
            >
              <VscSignOut size={30} />
              <span className="hidden md:inline">Sign out</span>
            </button>
          ) : (
            <button
              onClick={() => signIn()}
              className="flex gap-3 px-10 py-3 text-xl hover:bg-black hover:text-white focus:bg-black focus:text-white"
            >
              <VscSignIn size={30} />
              <span className="hidden md:inline">Sign In</span>
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};
