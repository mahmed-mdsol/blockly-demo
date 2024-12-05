import * as Blockly from 'blockly';
import { javascriptGenerator, Order } from 'blockly/javascript';

export function initConditionalBlocks() {
  Blockly.Blocks['custom_if'] = {
    init: function() {
      this.appendValueInput('IF')
          .setCheck('Boolean')
          .appendField('if');
      this.appendStatementInput('DO')
          .appendField('do');
      this.appendStatementInput('ELSE')
          .appendField('else');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(210);
      this.setTooltip('If-else statement');
    }
  };

  javascriptGenerator.forBlock['custom_if'] = function(block: Blockly.Block) {
    const condition = javascriptGenerator.valueToCode(block, 'IF', Order.NONE) || 'false';
    const doCode = javascriptGenerator.statementToCode(block, 'DO') || '';
    const elseCode = javascriptGenerator.statementToCode(block, 'ELSE') || '';
    return `if (${condition}) {\n${doCode}} else {\n${elseCode}}\n`;
  };
}
