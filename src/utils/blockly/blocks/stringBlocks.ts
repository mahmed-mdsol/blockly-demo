import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export function initStringBlocks() {
  Blockly.Blocks['text_concat'] = {
    init: function() {
      this.appendValueInput('A')
          .setCheck(['String', 'Number', 'Boolean'])
          .appendField('join');
      this.appendValueInput('B')
          .setCheck(['String', 'Number', 'Boolean'])
          .appendField('with');
      this.setOutput(true, 'String');
      this.setColour(160);
      this.setTooltip('Join two values together');
    }
  };

  Blockly.Blocks['text_to_string'] = {
    init: function() {
      this.appendValueInput('VALUE')
          .setCheck(null)
          .appendField('convert to text');
      this.setOutput(true, 'String');
      this.setColour(160);
      this.setTooltip('Convert any value to text');
    }
  };

  javascriptGenerator['text_concat'] = function(block: Blockly.Block) {
    const valueA = javascriptGenerator.valueToCode(block, 'A', javascriptGenerator.ORDER_NONE) || "''";
    const valueB = javascriptGenerator.valueToCode(block, 'B', javascriptGenerator.ORDER_NONE) || "''";
    return [`String(${valueA}) + String(${valueB})`, javascriptGenerator.ORDER_ADDITION];
  };

  javascriptGenerator['text_to_string'] = function(block: Blockly.Block) {
    const value = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_NONE) || "''";
    return [`String(${value})`, javascriptGenerator.ORDER_FUNCTION_CALL];
  };
}