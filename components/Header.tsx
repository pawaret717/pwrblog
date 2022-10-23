import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="mx-auto flex max-w-7xl justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="https://scontent.fcnx4-1.fna.fbcdn.net/v/t1.15752-9/301383282_1108405673126461_7975284357049415556_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGcKcLv-fDGmd96Iljb6zloKStXxeAl69MpK1fF4CXr09sFH0l6T_wHOaWJ8odjcfQYhiqlk4CCokkm93u7b0WY&_nc_ohc=OA48b3HN6-8AX-mizdj&_nc_ht=scontent.fcnx4-1.fna&oh=03_AdTXGGvk0eTe6TnJAO_y9COHvth2FKRLs4Vs_mdMKea7wQ&oe=637AA24D"
            alt=""
            className="w-40 cursor-pointer object-contain"
          />
        </Link>
        <div className="hidden items-center space-x-3 md:inline-flex">
          <h3 className="rounded-full bg-blue-600 px-4 py-1 text-white cursor-pointer">
            <a href="https://discord.gg/asxFmePR9y" target="_blank">
              Discord
            </a>
          </h3>
          <h3 className="rounded-full bg-pink-500 px-4 py-1 text-white cursor-pointer">
            <a href="https://www.instagram.com/pawaret_k/" target="_blank">
              Instagram
            </a>
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-purple-600">
        <h3 className="rounded-full border border-purple-600 px-4 py-1">
          <a
            href="https://web.facebook.com/profile.php?id=100009388998753"
            target="_blank"
          >
            Facebook
          </a>
        </h3>
      </div>
    </header>
  );
};

export default Header;
