package org.stephen.chain;

/**
 * ������ģʽ
 * @author qiao123
 *	�����ϵ����������һ������������һ��������������һ������ģʽ����Լ�������
 *	��Ҫ�����Լ�ȥʵ�֣�ͬʱ����һ��ʱ�̣�����ֻ������һ�����󴫸���һ�����󣬶����������������
 */
public class ChainTest {
	public static void main(String[] args) {
		MyHandler handler1 = new MyHandler("A");
		MyHandler handler2 = new MyHandler("B");
		MyHandler handler3 = new MyHandler("c");
		handler1.setHandler(handler2);
		handler2.setHandler(handler3);
		handler1.operator();
	}
}
