import Menu from '../menu/Menu';

interface WithLayoutProps {
	children: React.ReactNode;
}

export default function WithLayout({children}:WithLayoutProps)  {
	return (
		<>
			<Menu/>
			{children}
		</>
	)
};
