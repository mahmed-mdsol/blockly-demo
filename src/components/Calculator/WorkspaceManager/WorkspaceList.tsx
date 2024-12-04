import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { SavedWorkspace } from '../../../types/workspace';

interface WorkspaceListProps {
  workspaces: SavedWorkspace[];
  onSelect: (workspace: SavedWorkspace) => void;
  onEdit: (workspace: SavedWorkspace) => void;
  onDelete: (id: string) => void;
}

export function WorkspaceList({ workspaces, onSelect, onEdit, onDelete }: WorkspaceListProps) {
  if (workspaces.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No saved workspaces found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {workspaces.map((workspace) => (
        <div
          key={workspace.id}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => onSelect(workspace)}
            className="flex-1 text-left hover:text-blue-600"
          >
            <h3 className="font-medium">{workspace.name}</h3>
            <p className="text-sm text-gray-500">
              Last modified: {new Date(workspace.updatedAt).toLocaleDateString()}
            </p>
          </button>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(workspace)}
              className="p-2 text-gray-500 hover:text-blue-600"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(workspace.id)}
              className="p-2 text-gray-500 hover:text-red-600"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}