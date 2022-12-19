import os from 'os';

export function getUsername() {
  return os.userInfo().username;
}
