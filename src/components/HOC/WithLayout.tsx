import { Suspense } from "react";
import Menu from "../menu/Menu";
import Spinner from "../Spinner/Spinner";

interface WithLayoutProps {
	children: React.ReactNode;
}

export default function WithLayout({ children }: WithLayoutProps) {
	return (
		<>
			<Menu />
			<Suspense fallback={<Spinner />}>{children}</Suspense>
		</>
	);
}
