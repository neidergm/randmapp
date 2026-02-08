import React from 'react';

const Link = ({ href, children, className, onClick }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: (e: React.MouseEvent) => void;
}) => (
    <a href={href} className={className} onClick={onClick}>
        {children}
    </a>
);

export default Link;
