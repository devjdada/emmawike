import { useEffect, useState } from 'react';

export type Appearance = 'light' | 'dark' | 'system';

export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');

    useEffect(() => {
        const storedAppearance = localStorage.getItem('appearance') as Appearance | null;
        if (storedAppearance) {
            setAppearance(storedAppearance);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (appearance === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(systemTheme);
        } else {
            root.classList.add(appearance);
        }
    }, [appearance]);

    const updateAppearance = (newAppearance: Appearance) => {
        setAppearance(newAppearance);
        localStorage.setItem('appearance', newAppearance);
    };

    return { appearance, updateAppearance };
}
