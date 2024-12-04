import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';

export function initSwitchBlocks() {
  Blockly.Blocks['custom_switch'] = {
    init: function() {
      this.appendValueInput('SWITCH')
          .setCheck(null)
          .appendField('switch');
      this.appendStatementInput('CASES')
          .appendField('cases');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('Switch statement');
    }
  };

  Blockly.Blocks['custom_case'] = {
    init: function() {
      this.appendValueInput('CASE')
          .setCheck(null)
          .appendField('case');
      this.appendStatementInput('DO')
          .appendField('do');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('Case for switch statement');
    }
  };

  javascriptGenerator['custom_switch'] = function(block: Blockly.Block) {
    const switchValue = javascriptGenerator.valueToCode(block, 'SWITCH', javascriptGenerator.ORDER_NONE) || 'null';
    const cases = javascriptGenerator.statementToCode(block, 'CASES') || '';
    return `switch (${switchValue}) {\n${cases}}\n`;
  };

  javascriptGenerator['custom_case'] = function(block: Blockly.Block) {
    const caseValue = javascriptGenerator.valueToCode(block, 'CASE', javascriptGenerator.ORDER_NONE) || 'null';
    const doCode = javascriptGenerator.statementToCode(block, 'DO') || '';
    return `case ${caseValue}:\n${doCode}break;\n`;
  };
}