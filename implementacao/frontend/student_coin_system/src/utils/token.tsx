import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  role: string;
  exp: number;
}

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const userHasManagerRole = (token: string | null): TokenPayload | boolean => {

  interface TokenInfo {
    role: keyof typeof managerRoles;
  }

  // Pápeis de usuário ---------------------------------------------------|
  const managerRoles = { 'admin': true, 'medic': false, 'secretary': true };

  let tokenInfo: TokenInfo | null = null;

  if (token) {
    tokenInfo = decodeToken(token) as TokenInfo;
    return tokenInfo && managerRoles[tokenInfo.role];
  }

  return false;
};

export const userIsAdmin = (token: string | null): TokenPayload | boolean => {

  interface TokenInfo {
    role: keyof typeof adminRole;
  }

  // Pápeis de usuário ---------------------------------------------------|
  const adminRole = { 'admin': true };

  let tokenInfo: TokenInfo | null = null;

  if (token) {
    tokenInfo = decodeToken(token) as TokenInfo;
    return tokenInfo && adminRole[tokenInfo.role];
  }

  return false;
};

export const userRole = (token: string | null): TokenPayload | string => {

  interface TokenInfo {
    role: keyof typeof managerRoles;
  }

  // Pápeis de usuário ---------------------------------------------------|
  const managerRoles = { 'admin': 'admin', 'medic': 'medic', 'secretary': 'secretary' };


  let tokenInfo: TokenInfo | null = null;

  if (token) {
    tokenInfo = decodeToken(token) as TokenInfo;
    return managerRoles[tokenInfo.role];
  }

  return 'default';
};