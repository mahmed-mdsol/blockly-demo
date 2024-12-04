import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export function initLoopBlocks() {
  Blockly.Blocks['custom_for'] = {
    init: function() {
      this.appendValueInput('FROM')
          .setCheck('Number')
          .appendField('count from');
      this.appendValueInput('TO')
          .setCheck('Number')
          .appendField('to');
      this.appendStatementInput('DO')
          .appendField('do');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(120);
      this.setTooltip('For loop with range');
    }
  };

  Blockly.Blocks['custom_while'] = {
    init: function() {
      this.appendValueInput('CONDITION')
          .setCheck('Boolean')
          .appendField('while');
      this.appendStatementInput('DO')
          .appendField('do');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(120);
      this.setTooltip('While loop');
    }
  };

  javascriptGenerator['custom_for'] = function(block: Blockly.Block) {
    const from = javascriptGenerator.valueToCode(block, 'FROM', javascriptGenerator.ORDER_NONE) || '0';
    const to = javascriptGenerator.valueToCode(block, 'TO', javascriptGenerator.ORDER_NONE) || '0';
    const doCode = javascriptGenerator.statementToCode(block, 'DO') || '';
    return `for (let i = ${from}; i <= ${to}; i++) {\n${doCode}}\n`;
  };

  javascriptGenerator['custom_while'] = function(block: Blockly.Block) {
    const condition = javascriptGenerator.valueToCode(block, 'CONDITION', javascriptGenerator.ORDER_NONE) || 'false';
    const doCode = javascriptGenerator.statementToCode(block, 'DO') || '';
    return `while (${condition}) {\n${doCode}}\n`;
  };
}