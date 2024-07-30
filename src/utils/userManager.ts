export const setIdInLocalStorage = (id: string) => localStorage.setItem('userId', id)
export const setNameInLocalStorage = (name: string) => localStorage.setItem('userName', name)
export const setEmailInLocalStorage = (email: string) => localStorage.setItem('userEmail', email)

export const setUserInLocalStorage = (data: any) => localStorage.setItem('saveData', data)
export const getUserInLocalStorage = () => localStorage.getItem('saveData')
