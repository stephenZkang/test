package org.stephen.proxy;

/**
 * ����ģʽ
 * @author qiao123
 *	��ʵÿ��ģʽ���ƾͱ����˸�ģʽ�����ã�
 *	����ģʽ���Ƕ�һ���������������ԭ�������һЩ������
 *	����ģʽ��Ӧ�ó�����
 *		������еķ�����ʹ�õ�ʱ����Ҫ��ԭ�еķ������иĽ�����ʱ�����ְ취��
 *		1���޸�ԭ�еķ�������Ӧ������Υ���ˡ�����չ���ţ����޸Ĺرա���ԭ��
 *		2�����ǲ���һ�����������ԭ�еķ������ҶԲ����Ľ�����п��ơ����ַ������Ǵ���ģʽ��
 *		ʹ�ô���ģʽ�����Խ����ܻ��ֵĸ��������������ں���ά����
 */
public class Proxy implements Sourceable {
	private Source source;
	public Proxy() {
		this.source = new Source();
	}


	@Override
	public void method1() {
		before();
		source.method1();
		after();
	}


	private void after() {
		System.out.println("this is the after of the proxy!");
	}


	private void before() {
		System.out.println("this is the before of the proxy!");
	}

}
