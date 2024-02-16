/* eslint-disable import/no-extraneous-dependencies */
import Cookies from 'js-cookie';

export function saveAccessToken(accessToken: string): void {
  Cookies.set('access_token', accessToken);
}

export function useAccessToken(): string | undefined {
  return Cookies.get('access_token');
}
