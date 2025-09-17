import '../css/app.css';
import '../css/nprogress.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AdminProjectsCreate from '/Users/jdada/Herd/emmawika/resources/js/pages/Admin/Projects/Create.tsx';
import NProgress from 'nprogress';
import { createRoot } from 'react-dom/client';


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        if (name === 'Admin/Projects/Create') {
            return AdminProjectsCreate;
        }
        return resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx'));
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
});

let timeout: NodeJS.Timeout | null = null;

router.on('start', () => {
    timeout = setTimeout(() => NProgress.start(), 250);
});

router.on('progress', (event) => {
    if (event.detail.progress && event.detail.progress.percentage) {
        NProgress.set((event.detail.progress.percentage / 100) * 0.9);
    }
});

router.on('finish', () => {
    if (timeout) {
        clearTimeout(timeout);
    }
    NProgress.done();
});

// This will set light / dark mode on load...

