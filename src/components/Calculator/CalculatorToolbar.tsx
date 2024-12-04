import React, { useState } from 'react';
import { Play, Save, Folder, Download } from 'lucide-react';
import { SaveWorkspaceDialog } from './WorkspaceManager/SaveWorkspaceDialog';
import { WorkspaceDialog } from './WorkspaceManager/WorkspaceDialog';
import { SavedWorkspace } from '../../types/workspace';

interface CalculatorToolbarProps {
  onSave: (name: string) => void;
  onLoad: (workspace: SavedWorkspace) => void;
  onDelete: (id: string) => void;
  workspaces: SavedWorkspace[];
  onRun: () => void;
}

export function CalculatorToolbar({ onSave, onLoad, onDelete, workspaces, onRun }: CalculatorToolbarProps) {
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [isLoadDialogOpen, setIsLoadDialogOpen] = useState(false);
  const [workspaceToEdit, setWorkspaceToEdit] = useState<SavedWorkspace | null>(null);

  return (
    <>
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onRun}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <Play className="w-4 h-4 mr-2" />
              Run
            </button>
            <button
              onClick={() => setIsSaveDialogOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              onClick={() => setIsLoadDialogOpen(true)}
              className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              <Folder className="w-4 h-4 mr-2" />
              Load
            </button>
            <button className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      <SaveWorkspaceDialog
        isOpen={isSaveDialogOpen || !!workspaceToEdit}
        onClose={() => {
          setIsSaveDialogOpen(false);
          setWorkspaceToEdit(null);
        }}
        onSave={onSave}
        defaultName={workspaceToEdit?.name}
      />

      <WorkspaceDialog
        isOpen={isLoadDialogOpen}
        onClose={() => setIsLoadDialogOpen(false)}
        workspaces={workspaces}
        onSelect={onLoad}
        onEdit={setWorkspaceToEdit}
        onDelete={onDelete}
      />
    </>
  );
}