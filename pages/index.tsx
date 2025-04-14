import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
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

    <footer class="bg-white dark:bg-gray-900">
  <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
  <div class="sm:flex sm:items-center sm:justify-between">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
      © 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved.
    </span>
    <div class="flex mt-4 sm:justify-center sm:mt-0">
      <!-- Facebook -->
      <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 8 19">
          <path fill-rule="evenodd"
            d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
            clip-rule="evenodd" />
        </svg>
        <span class="sr-only">Facebook page</span>
      </a>

      <!-- Instagram -->
      <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
            clip-rule="evenodd" />
        </svg>
        <span class="sr-only">Instagram account</span>
      </a>

      <!-- TikTok -->
      <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
          fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M17.5 6.3v1.5a6.37 6.37 0 0 1-4.1-1.5v6.6a5.1 5.1 0 1 1-5.1-5.1c.2 0 .4 0 .6.1V5.1a6.6 6.6 0 0 0-.6 0 6.6 6.6 0 1 0 6.6 6.6V7.7a7.83 7.83 0 0 0 4.1 1.3V6.3h-1.5Z" />
        </svg>
        <span class="sr-only">TikTok account</span>
      </a>
    </div>
  </div>
</footer>  
      
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
