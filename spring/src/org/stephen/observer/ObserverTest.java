package org.stephen.observer;

/**
 * �۲���ģʽ
 * @author qiao123
 *	�۲���ģʽ�ܺ���⣬�������ʼ����ĺ�RSS���ģ�
 *	���������һЩ���ͻ�wikiʱ�������ῴ��RSSͼ�꣬
 *	�������˼�ǣ����㶩���˸����£���������и��£��ἰʱ֪ͨ�㡣
 *	��ʵ����������һ�仰����һ������仯ʱ�����������ö���Ķ��󶼻��յ�֪ͨ���������ű仯������֮����һ��һ�Զ�Ĺ�ϵ��
 */
public class ObserverTest {
	public static void main(String[] args) {
		Subject subject = new MySubject();
		Observer observer = new ObserverImpl();
		subject.add(observer);
		subject.operation();
	}
}
