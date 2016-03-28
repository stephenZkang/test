package org.stephen.singleton;

/**
 * ����ģʽ
 * @author qiao123
 *	���������������Ҫ��
 *	���ǣ������������̰߳�ȫ�������࣬
 *	������ǰ���������̵߳Ļ����£��϶��ͻ���������ˣ�
 *	��ν�����������Ȼ��뵽��getInstance������synchronized�ؼ��֣�
 */
public class Singleton {

	public static Singleton singleton = null;
	
	private Singleton() {
	}
	
	public static Singleton getInstance(){
		if(singleton==null){
			singleton = new Singleton();
		}
		return singleton;
	}
	
}
