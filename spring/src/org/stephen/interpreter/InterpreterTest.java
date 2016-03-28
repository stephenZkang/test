package org.stephen.interpreter;

/**
 * 解释器模式
 * @author qiao123
 *	基本就这样，解释器模式用来做各种各样的解释器，如正则表达式等的解释器等等！
 */
public class InterpreterTest {
	public static void main(String[] args) {
		Plus plus = new Plus();
		int result = plus.interpreter(new Context(9,8));
		System.out.println("result:"+result);
	}
}
