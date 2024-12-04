import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { initConditionalBlocks } from './blocks/conditionalBlocks';
import { initSwitchBlocks } from './blocks/switchBlocks';
import { initLoopBlocks } from './blocks/loopBlocks';
import { initStringBlocks } from './blocks/stringBlocks';

export function initCustomBlocks() {
  // Initialize all block types
  initConditionalBlocks();
  initSwitchBlocks();
  initLoopBlocks();
  initStringBlocks();

  // Calculator output block
  Blockly.Blocks['calculator_output'] = {
    init: function() {
      this.appendValueInput('VALUE')
          .setCheck(null)
          .appendField('Output');
      this.setColour(230);
      this.setTooltip('Output the result');
      this.setHelpUrl('');
    }
  };

  javascriptGenerator['calculator_output'] = function(block: Blockly.Block) {
    const value = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_ATOMIC);
    return `return ${value};`;
  };
}