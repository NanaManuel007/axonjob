// import { HoudiniClient } from '$houdini';
// import { get } from 'svelte/store';
// import { authStore } from '$lib/stores/authStore/authStore';

// export default new HoudiniClient({
//     url: 'http://localhost:5282/graphql/',
//     fetchParams({ session }) {
//         const auth = get(authStore);
//         return {
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: auth.token ? `Bearer ${auth.token}` : '',
//             },
//         };
//     },
// });
import { HoudiniClient } from '$houdini';
import { get } from 'svelte/store';
import { authStore } from '$lib/stores/authStore/authStore';

export default new HoudiniClient({
    url: 'http://localhost:5282/graphql/',
    fetchParams({ session }) {
        const auth = get(authStore);
        // Initialize headers object
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            // Add Authorization header if token exists
            ...(auth.token && { Authorization: `Bearer ${auth.token}` }),
            // Add the GraphQL-Preflight header
            'GraphQL-Preflight': '1',
        };
        return {
            headers: headers,
        };
    },
});