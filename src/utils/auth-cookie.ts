export const setAuthCookie = () => {
  document.cookie = `isAuth=1; path=/; max-age=${1000 * 60 * 60 * 24 * 30}; SameSite=Lax`
}

export const removeAuthCookie = () => {
  document.cookie = `isAuth=; path=/; max-age=0; SameSite=Lax`
}
