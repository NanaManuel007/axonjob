// Define types for user data
export type Permission = {
  permissionName: string;
  roleId: number;
};

export type Role = {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  rolePermissions: Permission[];
};

export type User = {
  id: number;
  email: string;
  roleId: number;
  roleName: string;
  createdAt: string;
  updatedAt: string;
  role?: Role;
};

/**
 * Filter users based on search term
 * @param users Array of users to filter
 * @param term Search term to filter by
 * @returns Filtered array of users
 */
export function filterUsers(users: User[], term: string): User[] {
  if (!term) return users;
  
  const lowerTerm = term.toLowerCase();
  return users.filter(user => {
    return (
      user.email.toLowerCase().includes(lowerTerm) ||
      user.id.toString().includes(term) ||
      user.role?.name.toLowerCase().includes(lowerTerm)
    );
  });
}

/**
 * Paginate users array
 * @param users Array of users to paginate
 * @param page Current page number (1-based)
 * @param perPage Number of items per page
 * @returns Paginated array of users
 */
export function paginateUsers(users: User[], page: number, perPage: number): User[] {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return users.slice(startIndex, endIndex);
}

/**
 * Calculate total number of pages
 * @param totalItems Total number of items
 * @param perPage Number of items per page
 * @returns Total number of pages
 */
export function calculateTotalPages(totalItems: number, perPage: number): number {
  return Math.ceil(totalItems / perPage);
}

/**
 * Process user data - filter and paginate
 * @param users Array of users to process
 * @param searchTerm Search term to filter by
 * @param currentPage Current page number
 * @param itemsPerPage Number of items per page
 * @returns Object containing processed data
 */
export function processUserData(
  users: User[], 
  searchTerm: string, 
  currentPage: number, 
  itemsPerPage: number
): { 
  paginatedUsers: User[]; 
  totalPages: number; 
  adjustedCurrentPage: number 
} {
  // Filter users
  const filtered = filterUsers(users, searchTerm);
  
  // Calculate total pages
  const totalPages = calculateTotalPages(filtered.length, itemsPerPage);
  
  // Ensure current page is valid
  const adjustedCurrentPage = Math.min(currentPage, totalPages) || 1;
  
  // Paginate users
  const paginatedUsers = paginateUsers(filtered, adjustedCurrentPage, itemsPerPage);
  
  return {
    paginatedUsers,
    totalPages,
    adjustedCurrentPage
  };
}