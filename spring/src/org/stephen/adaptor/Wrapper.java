package org.stephen.adaptor;

/**
 * ����������ģʽ
 * @author qiao123
 *	����˼·�����������ģʽ��ͬ��ֻ�ǽ�Adapter�����޸ģ�
 *	��β��̳�Source�࣬���ǳ���Source���ʵ�����Դﵽ��������Ե����⡣
 */
public class Wrapper implements Targetable {
	private Source source;
	
	public Wrapper(Source source) {
		this.source = source;
	}

	@Override
	public void method1() {
		source.method1();
	}

	@Override
	public void method2() {
		System.out.println("this is the method2 of the Wrapper");
	}

}
