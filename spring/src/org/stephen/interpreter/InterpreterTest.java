package org.stephen.interpreter;

/**
 * ������ģʽ
 * @author qiao123
 *	������������������ģʽ���������ָ����Ľ���������������ʽ�ȵĽ������ȵȣ�
 */
public class InterpreterTest {
	public static void main(String[] args) {
		Plus plus = new Plus();
		int result = plus.interpreter(new Context(9,8));
		System.out.println("result:"+result);
	}
}
