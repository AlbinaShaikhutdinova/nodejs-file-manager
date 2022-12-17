import { homedir } from 'os';

export function getHomeDirectory() {
  return homedir();
}
