import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const unauthorizedMsg = writable("")

interface AuthState {
    isAuthenticated: boolean;
    token: string | null;
    user: {
        email: string;
        userId: number;
        role: string;
        permissions: string[];
        isActive?: boolean;
        lastLogin?: string;
    } | null;
}

// Initialize state from localStorage if available
const initialState: AuthState = browser ? {
    isAuthenticated: !!localStorage.getItem('token'),
    token: localStorage.getItem('token'),
    user: JSON.parse(localStorage.getItem('user') || 'null')
} : {
    isAuthenticated: false,
    token: null,
    user: null
};

const createAuthStore = () => {
    const { subscribe, set, update } = writable<AuthState>(initialState);

    return {
        subscribe,
        login: (loginResponse: any) => {
            console.log('Received login response: ', loginResponse);
            
        
            let permissions = [];
            if (loginResponse.permissions && Array.isArray(loginResponse.permissions)) {
                permissions = loginResponse.permissions;
            } else if (loginResponse.role?.rolePermissions) {
                permissions = loginResponse.role.rolePermissions.map((p:any) => p.permissionName || p);
            }
            

            const roleName = typeof loginResponse.role === 'string' 
                ? loginResponse.role 
                : (loginResponse.role?.name || '');
            
            const authState = {
                isAuthenticated: true,
                token: loginResponse.token,
                user: {
                    email: loginResponse.email,
                    userId: loginResponse.userId || loginResponse.id, 
                    role: roleName,
                    permissions: permissions,
                    isActive: loginResponse.isActive !== false, 
                    lastLogin: new Date().toISOString()
                }
            };
            
            if (browser) {
                localStorage.setItem('token', loginResponse.token);
                localStorage.setItem('user', JSON.stringify(authState.user));
                
                localStorage.setItem('userRole', roleName);
                localStorage.setItem('userPermissions', JSON.stringify(permissions));
            }
            
            set(authState);
        },
        logout: () => {
            if (browser) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userPermissions');
                unauthorizedMsg.set("");
            }
            
            set({
                isAuthenticated: false,
                token: null,
                user: null
            });
        },

        hasPermission: (permission: string) => {
            let hasPermission = false;
            update(state => {
                hasPermission = !!state.user?.permissions?.includes(permission);
                return state;
            });
            return hasPermission;
        },
   
        hasRole: (role: string) => {
            let hasRole = false;
            update(state => {
                hasRole = state.user?.role === role;
                return state;
            });
            return hasRole;
        },
     
        updatePermissions: (permissions: string[]) => {
            update(state => {
                if (state.user) {
                    state.user.permissions = permissions;
                    
                    if (browser) {
                        localStorage.setItem('user', JSON.stringify(state.user));
                        localStorage.setItem('userPermissions', JSON.stringify(permissions));
                    }
                }
                return state;
            });
        },
        updateRole: (role: string) => {
            update(state => {
                if (state.user) {
                    state.user.role = role;
                    
                    if (browser) {
                        localStorage.setItem('user', JSON.stringify(state.user));
                        localStorage.setItem('userRole', role);
                    }
                }
                return state;
            });
        }
    };
};

export const authStore = createAuthStore();