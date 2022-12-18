import os from 'os';
export function getCPU() {
  const cpus = os.cpus();
  const res = [];
  res.push({ property: 'Number of CPUs', value: cpus.length });
  cpus.forEach((cpu) => {
    res.push({ model: cpu.model, speed: cpu.speed / 1000 });
  });
  return res;
}
