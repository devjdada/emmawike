import type { PageProps } from '@/types';
import ProjectForm from './ProjectForm';

export default function Create({ auth }: PageProps) {
    return <ProjectForm auth={auth} />;
}
