
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    try {
        const data = await (await fetch('/api')).json();

        return {
            ...data,
        };
    } catch (error) {
        return {
            date: null,
        };
    }
};