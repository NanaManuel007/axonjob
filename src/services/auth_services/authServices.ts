import { goto } from '$app/navigation';
import { graphql } from '$houdini';
import { authStore } from '$lib/stores/authStore/authStore';


export class AuthService {
    private static readonly loginMutation = graphql(`
        mutation Login($input: LoginInput!) {
            login(input: $input) {
                code
                success
                message
                result {
                    email
                    token
                    userId
                    role
                    permissions
                }
            }
        }
    `);

    static async login(email: string, password: string) {
        try {
            const response = await this.loginMutation.mutate({
                input: {
                    input: { email, password }
                }
            });

            if (!response.data || !response.data.login) {
                return {
                    success: false,
                    message: 'No response from server'
                };
            }

            if (response.data.login.success) {
                authStore.login(response.data.login.result);
                return { success: true };
            }
         
            return {
                success: false,
                message: response.data.login.message || 'Login failed'
            };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                message: 'An error occurred during login'
            };
        }
    }

    static async logout() {
        try {
            authStore.logout();
            await goto('/');
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return {
                success: false,
                message: 'An error occurred during logout'
            };
        }
    }
}