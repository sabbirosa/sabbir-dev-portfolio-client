export interface User {
  id: string;
  email: string;
  password: string;
  role: "admin";
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage for admin user (replace with database in production)
let adminUser: User | null = null;

export const getAdminUser = (): User | null => {
  return adminUser;
};

export const setAdminUser = (user: User): void => {
  adminUser = user;
};

export const findUserByEmail = (email: string): User | null => {
  if (adminUser && adminUser.email === email) {
    return adminUser;
  }
  return null;
};
