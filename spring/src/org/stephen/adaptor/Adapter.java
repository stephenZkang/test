package org.stephen.adaptor;

/**
 * ������ģʽ
 * @author qiao123
 *	������ģʽ��ĳ����Ľӿ�ת���ɿͻ�����������һ���ӿڱ�ʾ��
 *	Ŀ�����������ڽӿڲ�ƥ������ɵ���ļ��������⡣
 *	��Ҫ��Ϊ���ࣺ���������ģʽ�������������ģʽ���ӿڵ�������ģʽ��
 */
public class Adapter extends Source implements Targetable{

	@Override
	public void method2() {
		System.out.println("this is the method2 of the Adapter");
	}

}
