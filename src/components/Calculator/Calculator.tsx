import React, { useEffect, useRef, useCallback, useState } from 'react';
import * as Blockly from 'blockly';
import { initCustomBlocks } from '../../utils/blockly/customBlocks';
import { useBlocklyWorkspace } from '../../hooks/useBlocklyWorkspace';
import { CalculatorToolbar } from './CalculatorToolbar';
import { RunModal } from './RunModal/RunModal';
// @ts-expect-error this plugin doesn't have type definitions
import { ContinuousToolbox, ContinuousFlyout, ContinuousMetrics } from '@blockly/continuous-toolbox';

export function Calculator() {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const toolboxDiv = useRef<HTMLDivElement>(null);
  const [isRunModalOpen, setIsRunModalOpen] = useState(false);
  const {
    workspace,
    updateCode,
    workspaces,
    saveCurrentWorkspace,
    loadWorkspace,
    deleteWorkspaceById,
    code,
  } = useBlocklyWorkspace();

  const handleRun = useCallback(() => {
    setIsRunModalOpen(true);
  }, []);

  const executeCode = useCallback((variables: Record<string, string | number>) => {
    if (code) {
      try {
        // Create a function that takes the variables as parameters
        const variableNames = Object.keys(variables);
        const paramList = variableNames.join(', ');
        const functionBody = code;

        // Create and execute the function with the provided variables
        // eslint-disable-next-line no-new-func
        const calculationFn = new Function(paramList, functionBody);
        const result = calculationFn(...variableNames.map(name => variables[name]));

        console.log('Result:', result);
        alert(`Result: ${result}`);
      } catch (error) {
        console.error('Error executing code:', error);
        alert(`Error: ${error}`);
      }
    }
  }, [code]);

  useEffect(() => {
    if (!blocklyDiv.current || !toolboxDiv.current) return;

    initCustomBlocks();

    const workspaceConfig: Blockly.BlocklyOptions = {
      plugins: {
        toolbox: ContinuousToolbox,
        flyoutsVerticalToolbox: ContinuousFlyout,
        metricsManager: ContinuousMetrics,
      },
      toolbox: {
        kind: 'categoryToolbox',
        contents: [
          {
            kind: 'category',
            name: 'Math',
            colour: '#5C68A6',
            contents: [
              { kind: 'block', type: 'math_number' },
              { kind: 'block', type: 'math_arithmetic' },
              { kind: 'block', type: 'math_single' },
            ],
          },
          {
            kind: 'category',
            name: 'Text',
            colour: '#5CA65C',
            contents: [
              { kind: 'block', type: 'text' },
              { kind: 'block', type: 'text_concat' },
              { kind: 'block', type: 'text_to_string' },
            ],
          },
          {
            kind: 'category',
            name: 'Logic',
            colour: '#A65C81',
            contents: [
              { kind: 'block', type: 'logic_compare' },
              { kind: 'block', type: 'logic_operation' },
              { kind: 'block', type: 'logic_boolean' },
              { kind: 'block', type: 'custom_if' },
              { kind: 'block', type: 'custom_switch' },
              { kind: 'block', type: 'custom_case' },
            ],
          },
          {
            kind: 'category',
            name: 'Loops',
            colour: '#A6745C',
            contents: [
              { kind: 'block', type: 'custom_for' },
              { kind: 'block', type: 'custom_while' },
            ],
          },
          {
            kind: 'category',
            name: 'Variables',
            colour: '#5CA6A6',
            custom: 'VARIABLE',
          },
          {
            kind: 'category',
            name: 'Output',
            colour: '#A65C5C',
            contents: [
              { kind: 'block', type: 'calculator_output' },
            ],
          },
        ],
      },
      grid: {
        spacing: 20,
        length: 3,
        colour: '#ccc',
        snap: true,
      },
    };

    const newWorkspace = Blockly.inject(blocklyDiv.current, workspaceConfig);
    workspace.current = newWorkspace;

    newWorkspace.addChangeListener(() => {
      updateCode();
    });

    return () => {
      workspace.current?.dispose();
    };
  }, [workspace, updateCode]);

  return (
    <div className="flex flex-col h-screen">
      <CalculatorToolbar
        onSave={saveCurrentWorkspace}
        onLoad={loadWorkspace}
        onDelete={deleteWorkspaceById}
        workspaces={workspaces}
        onRun={handleRun}
        onExport={() => {
          if (workspace.current) {
            navigator.clipboard.writeText(JSON.stringify(Blockly.serialization.workspaces.save(workspace.current)));
            alert("Copied workspace json to clipboard!");
          }
        }}
      />
      <div className="flex-1 relative">
        <div
          ref={blocklyDiv}
          className="absolute inset-0"
        />
        <div
          ref={toolboxDiv}
          className="absolute top-0 right-0 h-full w-1/4 bg-white shadow-lg"
        >
          {code}
        </div>
      </div>

      <RunModal
        isOpen={isRunModalOpen}
        onClose={() => setIsRunModalOpen(false)}
        onRun={executeCode}
        workspace={workspace.current}
      />
    </div>
  );
}
