import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';

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

  javascriptGenerator.forBlock['text_concat'] = function(block: Blockly.Block) {
    const valueA = javascriptGenerator.valueToCode(block, 'A', Order.NONE) || "''";
    const valueB = javascriptGenerator.valueToCode(block, 'B', Order.NONE) || "''";
    return [`String(${valueA}) + String(${valueB})`, Order.ADDITION];
  };

  javascriptGenerator.forBlock['text_to_string'] = function(block: Blockly.Block) {
    const value = javascriptGenerator.valueToCode(block, 'VALUE', Order.NONE) || "''";
    return [`String(${value})`, Order.FUNCTION_CALL];
  };

}
