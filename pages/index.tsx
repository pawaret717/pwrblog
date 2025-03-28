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
