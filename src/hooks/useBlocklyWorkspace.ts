import { useRef, useState, useCallback } from 'react';
import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { SavedWorkspace } from '../types/workspace';
import { saveWorkspace, getAllWorkspaces, deleteWorkspace } from '../utils/storage/workspaceStorage';

export function useBlocklyWorkspace() {
  const workspace = useRef<Blockly.WorkspaceSvg | null>(null);
  const [savedState, setSavedState] = useState<SavedWorkspace | null>(null);
  const [code, setCode] = useState<string>('');
  const [workspaces, setWorkspaces] = useState<SavedWorkspace[]>(getAllWorkspaces());

  const updateCode = useCallback(() => {
    if (!workspace.current) return;
    const generatedCode = javascriptGenerator.workspaceToCode(workspace.current);
    setCode(generatedCode);
  }, []);

  const saveCurrentWorkspace = useCallback((name: string) => {
    if (!workspace.current) return;

    const state = Blockly.serialization.workspaces.save(workspace.current);

    const newWorkspace: SavedWorkspace = {
      id: name === savedState?.name ? savedState.id : crypto.randomUUID(),
      name,
      state,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveWorkspace(newWorkspace);
    setWorkspaces(getAllWorkspaces());
    setSavedState(newWorkspace);
  }, [savedState]);

  const loadWorkspace = useCallback((savedWorkspace: SavedWorkspace) => {
    if (!workspace.current) return;

    workspace.current.clear();
    Blockly.serialization.workspaces.load(savedWorkspace.state, workspace.current);
    setSavedState(savedWorkspace);
    updateCode();
  }, [updateCode]);

  const deleteWorkspaceById = useCallback((id: string) => {
    deleteWorkspace(id);
    setWorkspaces(getAllWorkspaces());
  }, []);

  return {
    workspace,
    code,
    workspaces,
    savedState,
    updateCode,
    saveCurrentWorkspace,
    loadWorkspace,
    deleteWorkspaceById,
  };
}
