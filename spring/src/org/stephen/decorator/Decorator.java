package org.stephen.decorator;

/**
 * װ����ģʽ
 * @author qiao123
 *	װ����ģʽ��Ӧ�ó�����
 *		1����Ҫ��չһ����Ĺ��ܡ�
 *		2����̬��Ϊһ���������ӹ��ܣ����һ��ܶ�̬���������̳в���������һ�㣬�̳еĹ����Ǿ�̬�ģ����ܶ�̬��ɾ����
 *		ȱ�㣺�����������ƵĶ��󣬲����Ŵ�
 */
public class Decorator implements Sourceable {
	private Sourceable source;
	public Decorator(Sourceable source) {
		this.source = source;
	}



	@Override
	public void method1() {
		System.out.println("before the method1!");
		source.method1();
		System.out.println("after the method2!");
	}

}
