export const getTokenFromLocalStorage = () => localStorage.getItem('token')
export const setTokenInLocalStorage = (token: string) => localStorage.setItem('token', token)
export const removeTokenFromLocalStorage = () => localStorage.removeItem('token')

export const getRoleFromLocalStorage = () => localStorage.getItem('role')
export const setRoleInLocalStorage = (role: string) => localStorage.setItem('role', role)
