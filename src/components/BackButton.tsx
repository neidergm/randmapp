'use client';

import { useRouter } from 'next/navigation';
import { LuArrowLeft } from 'react-icons/lu';

interface BackButtonProps {
    className?: string;
}

const BackButton = ({ className }: BackButtonProps) => {
    const router = useRouter();

    return (
        <button onClick={() => router.back()} className={className}>
            <LuArrowLeft size={18} />
            Back to Character List
        </button>
    );
};

export default BackButton;