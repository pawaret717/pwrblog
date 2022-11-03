import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="mx-auto flex max-w-7xl justify-between p-5">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="https://scontent.fbkk12-1.fna.fbcdn.net/v/t1.15752-9/310755559_1503082390167599_9036241321521054681_n.png?_nc_cat=106&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFMayuK-e3SSZHI4Iw-FKLJ119IThi6szDXX0hOGLqzMLKwKUwhWhkPu1Mnxgh4irLdIGtbA1UKNKBAgWLtDNcp&_nc_ohc=Fawfz_H6E7sAX-q4JBQ&tn=Qf2UdSppj9MpfYRb&_nc_ht=scontent.fbkk12-1.fna&oh=03_AdRiffxFQ2-nc4MzOuBMs8rwc5Cf0eXzo6N_FhKLlLJkwQ&oe=638AA5C2"
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
