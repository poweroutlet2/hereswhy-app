import { useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";

export default function ListsPage() {
	/* Will display the signed in user's lists
	*/
	const { data: session, status } = useSession()
	const user_id = session?.user?.id || 'none'

	const { data: lists } = trpc.threads.get_lists.useQuery(
		{ user_id },
		{ enabled: (status == 'authenticated') })

	if (session?.user?.id) {
		return (
			<>
				{lists?.map((list) => {
					return list.id
				})}
			</>
		)
	}
	return <div>Connect your twitter account to start saving threads!</div>
}