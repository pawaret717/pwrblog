import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer"; // เพิ่ม
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  console.log(posts);

  return (
    <div className="mx-auto">
      <Head>
        <title>MUSLIM UP BLOG</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex items-center justify-between border-y border-yellow-500 bg-green-700 py-5 lg:py-0">
        <div className="space-y-2 px-10">
          <h1 className="max-w-xl font-serif text-1xl text-white">
            <span className="underline decoration-yellow-500 decoration-3 underline-offset-4">
              MUSLIM CLUB UNIVERSITY OF PHAYAO
            </span>
            <br />
            
          </h1>
          <h4 className="text-white text-xs">
            ส่งเสริมศักยภาพ ดูแลคุณภาพชีวิต พัฒนาความสัมพันธ์นิสิตมุสลิม
          </h4>
        </div>
        <img
          className="hidden h-32 md:inline-flex lg:inline-flex"
          src=""
          alt=""
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 p-1 md:p-3">
  {posts.map((post: Post) => {
    // คำนวณว่าโพสต์นั้นเกิดขึ้นในช่วง 7 วันที่ผ่านมาไหม
    const postDate = new Date(post._createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - postDate.getTime();
    const isNew = timeDifference <= 7 * 24 * 60 * 60 * 1000; // เช็คว่าห่างกันไม่เกิน 7 วัน

    return (
      <Link key={post._id} href={`/post/${post.slug.current}`}>
        <div className="relative rounded-lg group cursor-pointer overflow-hidden border">
  {isNew && (
    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
      ใหม่
    </div>
  )}
  <img
    className="h-60 w-full object-cover transition-transform duration-200"
    src={urlFor(post.mainImage).url()!}
    alt=""
  />
  <div className="flex justify-between bg-white p-5">
    <div>
      <p className="text-[8px] text-white bg-blue-500 inline-block px-2 py-1 rounded">
        {getTimeAgo(post._createdAt)}
      </p>
      <p className="text-lg font-bold">{post.title}</p>
      <p className="text-xs">
        {post.description.length > 50
          ? `${post.description.slice(0, 50)} ...อ่านเพิ่มเติม...`
          : post.description}
      </p>
    </div>
    <img
      className="w-12 h-12 rounded-full"
      src={urlFor(post.author.image).url()!}
      alt=""
    />
  </div>
</div>
</Link>
);
})}
</div>

    const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between px-4 py-4">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © {new Date().getFullYear()} MUSLIM UP BLOG. All Rights Reserved.
        </span>
        <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
          {/* Facebook */}
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 8 19"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Facebook page</span>
          </a>

          {/* Instagram */}
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.31 3.608.059 1.267.07 1.647.07 4.848s-.012 3.58-.07 4.848c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.31-1.267.059-1.647.07-4.848.07s-3.58-.012-4.848-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.31-3.608C2.175 15.58 2.163 15.2 2.163 12s.012-3.58.07-4.848c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.31C8.42 2.175 8.8 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.773.13 4.67.44 3.68 1.43c-.99.99-1.3 2.092-1.358 3.372C2.013 6.082 2 6.491 2 9.75v4.5c0 3.259.013 3.668.072 4.948.058 1.28.368 2.382 1.358 3.372.99.99 2.092 1.3 3.372 1.358C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.28-.058 2.382-.368 3.372-1.358.99-.99 1.3-2.092 1.358-3.372.059-1.28.072-1.689.072-4.948v-4.5c0-3.259-.013-3.668-.072-4.948-.058-1.28-.368-2.382-1.358-3.372C19.33.44 18.228.13 16.948.072 15.668.013 15.259 0 12 0z" />
              <path d="M12 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
              <circle cx="18.406" cy="5.594" r="1.44" />
            </svg>
            <span className="sr-only">Instagram page</span>
          </a>

          {/* TikTok */}
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M12.93 0H9.73v16.13c-.01.75-.39 1.45-1.03 1.87a2.13 2.13 0 0 1-2.91-.67 2.1 2.1 0 0 1 1.68-3.2c.42.01.83.14 1.18.37V11.6a5.4 5.4 0 0 0-2.17-.47A5.36 5.36 0 0 0 1.5 16.53a5.36 5.36 0 0 0 9.55 3.35 5.35 5.35 0 0 0 1.88-4.06V7.82c.92.71 2.02 1.23 3.17 1.5V6.16a4.2 4.2 0 0 1-3.17-4.11z" />
            </svg>
            <span className="sr-only">TikTok page</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
      
    </div>
  );  
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const query = `*[_type=="post"]{
      _id,
      title,
      slug,
      author->{
        name,
        image
      },
      mainImage,
      description,
      _createdAt
    }`;

    const posts = await sanityClient.fetch(query);

    // เรียงโพสต์จากใหม่ไปเก่า
    const sortedPosts = posts.sort((a: Post, b: Post) => {
      const dateA = new Date(a._createdAt);
      const dateB = new Date(b._createdAt);
      return dateB.getTime() - dateA.getTime(); // เรียงจากล่าสุดไปเก่า
    });

    return {
      props: {
        posts: sortedPosts,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: { posts: [] } }; // กรณีเกิดข้อผิดพลาด
  }
};

function getTimeAgo(createdAt: string) {
  const postDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - postDate.getTime();

  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  const monthsDifference = Math.floor(daysDifference / 30);
  const yearsDifference = Math.floor(daysDifference / 365);

  if (daysDifference < 1) {
    return 'วันนี้';
  } else if (daysDifference < 7) {
    return `${daysDifference} วันที่ผ่านมา`;
  } else if (daysDifference < 30) {
    return `${Math.floor(daysDifference / 7)} สัปดาห์ที่ผ่านมา`;
  } else if (monthsDifference < 12) {
    return `${monthsDifference} เดือนที่ผ่านมา`;
  } else {
    return `${yearsDifference} ปีที่ผ่านมา`;
  }
}
