import { SavedWorkspace } from '../../types/workspace';

const STORAGE_KEY = 'blockly-calculator-workspaces';

export function saveWorkspace(workspace: SavedWorkspace): void {
  const workspaces = getAllWorkspaces();
  const existingIndex = workspaces.findIndex(w => w.id === workspace.id);
  
  if (existingIndex >= 0) {
    workspaces[existingIndex] = workspace;
  } else {
    workspaces.push(workspace);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workspaces));
}

export function getAllWorkspaces(): SavedWorkspace[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getWorkspaceById(id: string): SavedWorkspace | undefined {
  return getAllWorkspaces().find(w => w.id === id);
}

export function deleteWorkspace(id: string): void {
  const workspaces = getAllWorkspaces().filter(w => w.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(workspaces));
}