import type {
  Processes,
  ProcessAction,
  ProcessState,
  ProcessConstructor
} from '@/utils/pm.d';

const addProcess = (
  process: Process,
  processes: Processes,
  previousState: ProcessState = {}
): Processes => [...processes, { ...process, ...previousState }];

const removeProcess = (id: string, processes: Processes): Processes => {
  return processes.filter((process) => {
    if (process.id !== id) return true;
  });
};

const updateProcess = (
  id: string,
  updates: ProcessState,
  processes: Processes
): Processes =>
  processes.map((process) =>
    process.id === id ? { ...process, ...updates } : process
  );

export const processReducer = (
  processes: Processes,
  { id, process, updates, previousState }: ProcessAction
): Processes => {
  if (id && updates) return updateProcess(id, updates, processes);
  if (process) return addProcess(process, processes, previousState);
  if (id) return removeProcess(id, processes);
  return processes;
};

export const getProcessId = (name: string): string =>
  name.toLowerCase().replace(/ /g, '_');

export class Process {
  loader;
  icon;
  name;

  bgColor;
  height;
  hideScrollbars;
  id;
  lockAspectRatio;
  width;
  windowed;

  maximized = false;
  minimized = false;

  x;
  y;

  constructor({
    loader,
    icon,
    name,

    bgColor = '#fff',
    height = 0,
    hideScrollbars = false,
    id = getProcessId(name),
    lockAspectRatio = false,
    width = 0,
    windowed = true,
    x = 0,
    y = 0
  }: ProcessConstructor) {
    this.loader = loader;
    this.icon = icon;
    this.name = name;
    this.bgColor = bgColor;
    this.height = height;
    this.hideScrollbars = hideScrollbars;
    this.id = id;
    this.lockAspectRatio = lockAspectRatio;
    this.width = width;
    this.windowed = windowed;
    this.x = x;
    this.y = y;
  }
}
