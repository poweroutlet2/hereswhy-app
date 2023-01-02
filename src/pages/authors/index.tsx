// import { createProxySSGHelpers } from "@trpc/react-query/ssg";
// import Head from "next/head";
// import { createContextInner } from "../../server/trpc/context";
// import { threadsRouter } from "../../server/trpc/router/threadsRouter";
// import superjson from 'superjson'
// import type { InferGetStaticPropsType } from "next";

// async function getStaticPaths() {
//     return { paths: [], fallback: true }
// }
// async function getStaticProps() {
//     const ssg = createProxySSGHelpers({
//         router: threadsRouter,
//         ctx: await createContextInner(),
//         transformer: superjson
//     });
// }

// export default function authors({ authors }: InferGetStaticPropsType<typeof getStaticProps>) {
//     return (
//         <>
//             <Head>
//                 <title>Threads</title>
//                 <meta name="description" content="Twitter threads" />
//                 <link rel="icon" href="/favicon.ico" />
//                 <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
//             </Head>
//         </>
//     )
// }