import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="sticky top-0 mx-auto flex justify-between p-5 bg-white">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="https://scontent.fbkk12-1.fna.fbcdn.net/v/t39.30808-6/440167179_844073877752810_4355912340023388672_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=oEBhCaI8V3kQ7kNvgHQOBlO&_nc_zt=23&_nc_ht=scontent.fbkk12-1.fna&_nc_gid=jBwDEarOxoYiJUnBhEBBZw&oh=00_AYGHBewYYPThzQWxlb18wfrtgwlerm51A1DwrPc4PqpfQw&oe=67EB8CE1"
            alt=""
            className="w-20 cursor-pointer object-contain"
          />
        </Link>
        <div className="hidden items-center space-x-3 md:inline-flex">
          <h3 className="rounded-full bg-pink-500 px-4 py-1 text-white cursor-pointer">
            <a href="https://www.instagram.com/muslimclub.up/" target="_blank">
              Instagram
            </a>
          </h3>
          <h3 className="rounded-full bg-black px-4 py-1 text-white cursor-pointer">
            <a href="https://www.tiktok.com/@muslimclub.up" target="_blank">
              Tiktok
            </a>
          </h3>
        </div>
      </div>

      <div className="flex items-center space-x-5 text-blue-500">
        <h3 className="rounded-full border border-blue-500 px-4 py-1">
          <a
            href="https://www.facebook.com/muslimclub.UP"
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
