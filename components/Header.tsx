import Link from "next/link";
import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="sticky top-0 mx-auto flex justify-between p-5 bg-white">
      <div className="flex items-center space-x-5">
        <Link href="/">
          <img
            src="ahttps://imagekit.io/tools/asset-public-link?detail=%7B%22name%22%3A%22440167179_844073877752810_4355912340023388672_n.jpg%22%2C%22type%22%3A%22image%2Fjpeg%22%2C%22signedurl_expire%22%3A%222028-03-26T23%3A18%3A59.323Z%22%2C%22signedUrl%22%3A%22https%3A%2F%2Fmedia-hosting.imagekit.io%2Fe2abea1e641941ec%2F440167179_844073877752810_4355912340023388672_n.jpg%3FExpires%3D1837725539%26Key-Pair-Id%3DK2ZIVPTIP2VGHC%26Signature%3DqCfIEYTS26ilhXoi0~htsdcpbJe7NZhJX~08R-B6bFcJCkU4RaMehzCDLal28-D0l6iUfdyeDI~jZyoTxoEEms8sFUAeva-NWRiSYROzDImBCCMlXBxUQ4fvHpTKegeCVYVVb0VbX74UpouiaocdtRW6OuiJFBrMWzY6XsvH1iMbRuwJ2o9J1LacTVBbXq3x86W~p-AHdnh1AuTb6lTIaUo51m5L-E2Ip8PAltMHh9BfnWSzBkNWpTFbFEoLDrHrFnuTGytW76BhJrmWUh3SYnMAY-0Klllod44wWKhHXsoC60Jwxhu6aqdhYdb-LqGb5b1UThg4Nn5wHUeDRmoF-g__%22%7D"
            alt=""
            className="w-10 cursor-pointer object-contain"
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
