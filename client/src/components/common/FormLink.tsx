import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
	link: string;
	linkPrefix: string;
}

const FromLink: React.FC<Props> = ({ link, children, linkPrefix }) => {
	return (
		<h3 className='m-t-15 text-center'>
			{linkPrefix} <Link to={link}>{children}</Link>
		</h3>
	);
};

export default FromLink;
