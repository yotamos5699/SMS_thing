import { NextPage } from "next";
import Head from "next/head";

const Contacts: NextPage = () => {
  // cd sms_thing
  // npx prisma db push
  // npm run dev
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        dir="rtl"
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]"
      >
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">contacts</span>
          </h1>
        </div>
      </main>
    </>
  );
};

export default Contacts;
