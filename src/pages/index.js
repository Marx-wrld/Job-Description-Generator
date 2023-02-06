import Head from 'next/head';
import { Inter } from '@next/font/google';
import Dashboard from "@/components/Dashboard";

const inter = Inter(
{ 
  subsets: ['latin'], 
  weight: ["100", "300", "400", "500", "700", "900"] 
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Job Description Generator</title>
        <meta name="description" content="Job Description Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"bg-white min-h-screen py-2"}>
        <div className="flex flex-col items-center justify-center px-4 py-2">{/* padding left-right and padding top-bottom*/}
          <h1 className="text-4xl md:text-6xl font-bold">
            Job Description Generator
          <span className="text-4xl md:text-6xl font-bold text-blue-600">{/* @media customize screen*/}
            .
          </span>
          </h1>
          <p className="mt-3 text-2xl">
            Create Beautiful
            <span className="text-2xl font-bold text-blue-600">
              {" "}
              Job Descriptions{" "}
            </span>
            for your Company
          </p>
        </div>
        <Dashboard/>
        </main>
    </>
  );
}
