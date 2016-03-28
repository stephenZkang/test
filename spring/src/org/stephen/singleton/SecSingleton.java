package org.stephen.singleton;

/**
 * 
 * @author qiao123
 *	synchronized�ؼ�����ס������������������÷����������ϻ������½�����Ϊÿ�ε���getInstance()��
 *	��Ҫ�Զ�����������ʵ�ϣ�ֻ���ڵ�һ�δ��������ʱ����Ҫ������֮��Ͳ���Ҫ�ˣ����ԣ�����ط���Ҫ�Ľ������Ǹĳ����������
 */
public class SecSingleton {
	private static SecSingleton secSingleton = null;
	private SecSingleton() {
	}
	
	public static synchronized SecSingleton getInstance(){
		if(secSingleton ==null){
			secSingleton = new SecSingleton();
		}
		return secSingleton;
	}
	
}
