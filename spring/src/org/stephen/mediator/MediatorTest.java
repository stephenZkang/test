package org.stephen.mediator;


/**
 * �н���ģʽ
 * @author qiao123
 *	�н���ģʽҲ��������������֮�����ϵģ���Ϊ�������֮����������ϵ�Ļ���
 *	�����ڹ��ܵ���չ��ά������ΪֻҪ�޸�һ���������������Ķ��󶼵ý����޸ġ�
 *	���ʹ���н���ģʽ��ֻ����ĺ�Mediator��Ĺ�ϵ����������֮��Ĺ�ϵ�����Ƚ���Mediator����
 */
public class MediatorTest {
	public static void main(String[] args) {
		Mediator mediator = new MyMediator();
		mediator.createMediator();
		mediator.workAll();
	}
}
