import os from 'os';

export function getArchitecture() {
  return os.arch();
}
