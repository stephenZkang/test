package org.stephen.template;

/**
 * ģ�巽��ģʽ
 * @author qiao123
 *	����һ��ģ�巽��ģʽ������ָ��һ���������У���һ�����������ٶ���1...n�������������ǳ���ģ�
 *	Ҳ������ʵ�ʵķ���������һ���࣬�̳иó����࣬��д���󷽷���ͨ�����ó����࣬ʵ�ֶ�����ĵ���
 */
public class TemplateTest {
	public static void main(String[] args) {
		AbstractCalculator calculator = new Plus();
		int result = calculator.calculate("8+8", "\\+");
		System.out.println("result:"+result);
	}
}
