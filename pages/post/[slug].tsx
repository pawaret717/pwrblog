import { GetServerSideProps } from "next";
import React, { useState } from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post, Comment } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler, UseFormProps } from "react-hook-form";

interface Props {
  post: Post;
}

interface IFormInput extends UseFormProps {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

const Post = ({ post }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  console.log(post);

  const [submitted, setSubmitted] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <Header />
      <img
        className="h-40 w-full object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />

      <article className="mx-auto max-w-3xl p-5 ">
        <h1 className="mt-10 mb-3 text-3xl">{post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(post.author.image).url()!}
            alt=""
          />

          <p className="text-sm font-extralight">
            โพสต์โดย <span className="text-purple-600">{post.author.name}</span>{" "}
            เผยแพร่เมื่อ {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="my-5 text-2xl font-bold" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="my-5 text-xl font-bold" {...props} />
              ),
              p: (props: any) => <p className="my-5" {...props} />,
              li: (children: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ children, href }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>

      <hr className="my-5 mx-auto max-w-lg border border-pink-500" />


    </main>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryDB = `*[_type=="post" && slug.current==$slug][0]{
    _id,
    _createdAt,
    title,
    slug,
    author->{
    name,
    image
  },
  'comments':*[
    _type=="comment" && post._ref==^._id&&approved==true
  ],
  mainImage,
  description,
  body
  }`;

  const post = await sanityClient.fetch(queryDB, {
    slug: query?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
};
