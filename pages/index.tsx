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

      <div className="flex items-center justify-between border-y border-black bg-green-700 py-10 lg:py-0">
        <div className="space-y-4 px-10">
          <h1 className="max-w-xl font-serif text-1xl text-white">
            <span className="underline decoration-white decoration-3">
              MUSLIM CLUB UNIVERSITY OF PHAYAO
            </span>
            <br />
            
          </h1>
          <h4 className="text-white">
            ส่งเสริมศักยภาพ ดูแลคุณภาพชีวิต พัฒนาความสัมพันธ์นิสิตมุสลิม
          </h4>
        </div>
        <img
          className="hidden h-32 md:inline-flex lg:inline-flex"
          src=""
          alt=""
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map((post: Post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="rounded-lg group cursor-pointer overflow-hidden border">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between bg-white p-5">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} โดย{" "}
                    <span className="text-pink-700">{post.author.name}</span>
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
        ))}
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
    description
    }`;

    const posts = await sanityClient.fetch(query);

    return {
      props: {
        posts,
      },
    };
  } catch (error) {}
};
