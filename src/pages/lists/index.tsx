import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

export default function ListsPage() {
	/* Will display the signed in user's lists
	*/
	const { data: session, status } = useSession()
	const user_id = session?.user?.id || 'none'

	const { data: lists } = trpc.threads.get_user_lists.useQuery(
		{ user_id },
		{ enabled: (status == 'authenticated') })

	if (session?.user?.id) {
		return (
			<>
				<Head>
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
				<h1>Your Lists</h1>
				{lists?.map((list) => {
					return <Link
						href={`/lists/${list.id}`}
						className="p-5 mt-5 hover:underline text-blue-500 border-2 rounded-xl"
						key={list.id}>{list.name}</Link>
				})}
			</>
		)
	}
	return <div>Connect your twitter account to start saving threads!</div>
}