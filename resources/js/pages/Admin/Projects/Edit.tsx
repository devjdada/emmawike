import type { PageProps } from '@/types';
import ProjectForm from './ProjectForm';

interface Project {
    id: string;
    posted_by_staff_id: string;
    title: string;
    description: string;
    type: string;
    status: string;
    start_date: string;
    end_date: string;
    image_url: string;
    budget: number;
    location: string;
    is_featured: boolean;
    progress: number;
    date_added: string;
    team_size: number;
}

interface EditProjectProps extends PageProps {
    project: Project;
}

export default function Edit({ auth, project }: EditProjectProps) {
    return <ProjectForm auth={auth} project={project} />;
}
