import React, { useState } from 'react';
import { X } from 'lucide-react';
import { getVariablesFromWorkspace } from '../../../utils/blockly/variableUtils';
import Blockly from 'blockly';

interface RunModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRun: (variables: Record<string, string | number | boolean>) => void;
  workspace: Blockly.WorkspaceSvg | null;
}

export function RunModal({ isOpen, onClose, onRun, workspace }: RunModalProps) {
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const variables = workspace ? getVariablesFromWorkspace(workspace) : [];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedValues: Record<string, string | number | boolean> = {};

    variables.forEach((variable) => {
      const value = variableValues[variable.id] || '';
      // Convert string values to appropriate types
      processedValues[variable.name] = variable.type === 'Number'
        ? Number(value)
        : variable.type === 'Boolean'
        ? value.toLowerCase() === 'true'
        : value;
    });

    onRun(processedValues);
    onClose();
  };

  const handleInputChange = (variableId: string, value: string) => {
    setVariableValues((prev) => ({
      ...prev,
      [variableId]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Initialize Variables</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
        {variables.length === 0 ? (
          <p className="text-gray-600">No variables to initialize.</p>
        ) : (
            <div className="space-y-4">
              {variables.map((variable) => (
                <div key={variable.id}>
                  <label
                    htmlFor={variable.id}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {variable.name} ({variable.type})
                  </label>
                  {variable.type === 'Boolean' ? (
                    <select
                      id={variable.id}
                      value={variableValues[variable.id] || 'false'}
                      onChange={(e) => handleInputChange(variable.id, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="false">false</option>
                      <option value="true">true</option>
                    </select>
                  ) : (
                    <input
                      type={variable.type === 'Number' ? 'number' : 'text'}
                      id={variable.id}
                      value={variableValues[variable.id] || ''}
                      onChange={(e) => handleInputChange(variable.id, e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${variable.type.toLowerCase()} value`}
                    />
                  )}
                </div>
              ))}
            </div>
        )}
          <div className="mt-6 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Run Calculation
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
