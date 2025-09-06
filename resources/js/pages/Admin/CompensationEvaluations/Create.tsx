import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CreateCompensationEvaluationForm from './CreateForm';

export default function CreateCompensationEvaluation({ auth, can }: PageProps & { can: { publish: boolean } }) {
    return (
        <AppLayout user={auth.user}>
            <Head title="Create Compensation Evaluation" />

            <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
                <h1 className="mb-6 text-2xl font-semibold">Create New Compensation Evaluation</h1>
                <CreateCompensationEvaluationForm auth={auth} can={can} />
            </div>
        </AppLayout>
    );
}
