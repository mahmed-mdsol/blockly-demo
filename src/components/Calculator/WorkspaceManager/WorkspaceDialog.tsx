import React from 'react';
import { X } from 'lucide-react';
import { SavedWorkspace } from '../../../types/workspace';
import { WorkspaceList } from './WorkspaceList';

interface WorkspaceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  workspaces: SavedWorkspace[];
  onSelect: (workspace: SavedWorkspace) => void;
  onEdit: (workspace: SavedWorkspace) => void;
  onDelete: (id: string) => void;
}

export function WorkspaceDialog({
  isOpen,
  onClose,
  workspaces,
  onSelect,
  onEdit,
  onDelete,
}: WorkspaceDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 rounded-lg p-6 w-[600px] max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Saved Workspaces</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <WorkspaceList
            workspaces={workspaces}
            onSelect={(workspace) => {
              onSelect(workspace);
              onClose();
            }}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      </div>
    </div>
  );
}