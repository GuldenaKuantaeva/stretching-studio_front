export const userAuthenticated = (accessToken: string | null | undefined) => {
  return accessToken !== undefined && accessToken !== null;
};

export default defineNuxtRouteMiddleware((to) => {
  const accessToken = useCookie('accessToken');

  if (to.path === '/auth/register' && !userAuthenticated(accessToken.value))
    return

  if (to.path !== '/auth/login' && !userAuthenticated(accessToken.value))
    return navigateTo('/auth/login')

  if ((to.path === '/auth/login' || to.path === '/auth/register') && userAuthenticated(accessToken.value)) {
    return navigateTo('/account')
  }

  return;
});