import React from 'react';
import { Helmet } from 'react-helmet';

import './layout.scss';

interface Props {
	title: string;
	style?: React.CSSProperties;
	className?: string;
}

const Layout: React.FC<Props> = ({ children, title, style, className }) => {
	return (
		<div className='layout'>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			<main style={style} className={`layout__child ${className}`}>
				{children}
			</main>
		</div>
	);
};

export default Layout;
