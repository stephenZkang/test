package org.stephen.factory;

/**
 * ���󹤳�ģʽ
 * @author qiao123
 *	��ʵ���ģʽ�ĺô����ǣ�
 *		���������������һ�����ܣ�
 *		����ʱ��Ϣ����ֻ����һ��ʵ���࣬
 *		ʵ��Sender�ӿڣ�ͬʱ��һ�������࣬
 *		ʵ��Provider�ӿڣ���OK�ˣ�
 *		����ȥ�Ķ��ֳɵĴ��롣����������չ�ԽϺã�
 */
public interface Provider {
	public Sender product();
}
