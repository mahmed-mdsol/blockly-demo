import * as Blockly from 'blockly';
import { Variable } from '../../types/variable';

export function getVariablesFromWorkspace(workspace: Blockly.WorkspaceSvg): Variable[] {
  const variables = workspace.getAllVariables();
  
  return variables.map(variable => ({
    id: variable.getId(),
    name: variable.name,
    type: inferVariableType(variable),
  }));
}

function inferVariableType(variable: Blockly.VariableModel): 'Number' | 'String' | 'Boolean' {
  const workspace = variable.workspace;
  const blocks = workspace.getAllBlocks();
  
  for (const block of blocks) {
    const vars = block.getVarModels();
    if (!vars?.some(v => v.getId() === variable.getId())) continue;

    // Check block types to infer variable type
    switch (block.type) {
      // Number operations
      case 'math_arithmetic':
      case 'math_number':
      case 'math_single':
        return 'Number';
      
      // Boolean operations
      case 'logic_operation':
      case 'logic_boolean':
      case 'logic_compare':
        return 'Boolean';
      
      // String operations
      case 'text':
      case 'text_concat':
      case 'text_to_string':
        return 'String';
    }

    // Check if the variable is used in a comparison
    if (block.type === 'logic_compare') {
      const operation = block.getFieldValue('OP');
      // String comparisons
      if (['EQ', 'NEQ'].includes(operation)) {
        const input = block.getInputTargetBlock('A') || block.getInputTargetBlock('B');
        if (input?.type === 'text') {
          return 'String';
        }
      }
    }
  }
  
  // Default to String if no specific type is inferred
  return 'String';
}