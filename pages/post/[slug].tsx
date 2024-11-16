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

        <hr className="my-5 mx-auto max-w-lg border border-pink-500" />

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

      /*{submitted ? (
        <div className="my-10 mx-auto flex max-w-2xl flex-col bg-purple-500 p-10 text-white">
          <h3 className="text-3xl font-bold">ขอบคุณสำหรับ Comment ของคุณ!</h3>
          <p>เมื่อ Comment ของคุณได้รับการอนุมัติแล้วจะปรากฏด้านล่างนี้</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mb-10 flex max-w-2xl flex-col p-5"
        >
          <h3 className="text-sm text-purple-500">
            คิดเห็นอย่างไรเกี่ยวกับ Blog นี้?
          </h3>
          <h4 className="text-3xl font-bold">แสดงความคิดเห็นด้านล่างนี้เลย!</h4>

          <hr className="mt-2 py-3" />

          <input
            type="hidden"
            {...register("_id")}
            value={post._id}
            name="_id"
          />

          <label className="mb-5 block">
            <span className="text-purple-700">ชื่อ</span>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="กรอกชื่อ"
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-purple-500 focus:ring"
            />
          </label>
          <label className="mb-5 block">
            <span className="text-purple-700">อีเมล</span>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="กรอกอีเมล example@gmail.com"
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-purple-500 focus:ring"
            />
          </label>
          <label className="mb-5 block">
            <span className="text-purple-700">ความคิดเห็น</span>
            <textarea
              {...register("comment", { required: true })}
              rows={8}
              placeholder="แสดงความคิดเห็นตรงนี้เลย"
              className="form-input mt-1 block w-full rounded border py-2 px-3 shadow outline-none ring-purple-500 focus:ring"
            />
          </label>

          <div className="flex flex-col p-5 ">
            {errors.name && (
              <span className="text-red-500">• จำเป็นต้องกรอก ชื่อ</span>
            )}
            {errors.email && (
              <span className="text-red-500">• จำเป็นต้องกรอก อีเมล</span>
            )}
            {errors.comment && (
              <span className="text-red-500">• จำเป็นต้องกรอก ความคิดเห็น</span>
            )}
          </div>

          <input
            type="submit"
            className="focus:shadow-outline cursor-pointer rounded-sm bg-purple-500 py-2 px-4 font-bold text-white shadow hover:bg-purple-400 focus:outline-none"
          />
        </form>
      )}

      <div className="my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10 shadow shadow-pink-500">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment: Comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-purple-500">{comment.name}: </span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>*/

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
