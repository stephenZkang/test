package org.stephen.adaptor;

/**
 * ������
 * @author qiao123
 *
 */
public class Test {
	public static void main(String[] args) {
		//��������ģʽ
		Targetable adapter = new Adapter();
		adapter.method1();
		adapter.method2();
		
		//����������ģʽ
		Source source = new Source();
		Targetable targetable = new Wrapper(source);
		targetable.method1();
		targetable.method2();
	}
}
