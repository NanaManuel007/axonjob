import { writable } from 'svelte/store';

export interface Candidate {
    id: number;
    name: string;
    image: string;
    email: string;
    location: string;
    joinedDate: string;
    phoneNumber: string;
    userVerified: boolean;
    adminVerified: boolean;
}

// Initialize the store with some sample data
export const candidates = writable<Candidate[]>([
    {
        id: 1,
        name: "John Doe",
        image: "/src/lib/assets/images/Jeet Saru.jpg",
        email: "john.doe@example.com",
        location: "London, UK",
        joinedDate: "2024-01-15",
        phoneNumber: "+44 123 456 7890",
        userVerified: true,
        adminVerified: false
    },
    {
        id: 2,
        name: "Jane Smith",
        image: "/src/lib/assets/images/Jeet Saru.jpg",
        email: "jane.smith@example.com",
        location: "Manchester, UK",
        joinedDate: "2024-01-16",
        phoneNumber: "+44 987 654 3210",
        userVerified: true,
        adminVerified: true
    },
    {
        id: 3,
        name: "Mike Johnson",
        image: "/src/lib/assets/images/Jeet Saru.jpg",
        email: "mike.johnson@example.com",
        location: "Birmingham, UK",
        joinedDate: "2024-01-17",
        phoneNumber: "+44 555 123 4567",
        userVerified: false,
        adminVerified: false
    },
    
]);