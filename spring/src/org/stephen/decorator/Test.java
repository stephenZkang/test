package org.stephen.decorator;

/**
 * װ����ģʽ
 * @author qiao123
 *	װ����ģʽ��Ӧ�ó�����
 *		1����Ҫ��չһ����Ĺ��ܡ�
 *		2����̬��Ϊһ���������ӹ��ܣ����һ��ܶ�̬���������̳в���������һ�㣬�̳еĹ����Ǿ�̬�ģ����ܶ�̬��ɾ����
 *		ȱ�㣺�����������ƵĶ��󣬲����Ŵ�
 */
public class Test {
	public static void main(String[] args) {
		Sourceable  source = new Source();
		Decorator decorator = new Decorator(source);
		decorator.method1();
	}
}
