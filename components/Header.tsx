import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="sticky top-0 mx-auto flex justify-between p-5 bg-white">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="https://cdn.sanity.io/images/2pikbpyu/production/d8d7847bba913b7c18aad9342c21fd1500a98529-2048x508.png"
            alt=""
            className="w-40 cursor-pointer object-contain"
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
