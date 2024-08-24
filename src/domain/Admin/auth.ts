export const validateToken = (token: string | undefined): boolean =>
  token === import.meta.env.AUTH_TOKEN;

export const login = (user: string, pass: string): Promise<string> => {
  if (
    user.trim() === import.meta.env.ADMIN_USER &&
    pass === import.meta.env.ADMIN_PASSWORD
  ) {
    return Promise.resolve(import.meta.env.AUTH_TOKEN);
  }
  return Promise.reject("Invalid credentials");
};
