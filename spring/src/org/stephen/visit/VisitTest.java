package org.stephen.visit;

/**
 * ������ģʽ
 * @author qiao123
 *	����˵��������ģʽ����һ�ַ���������ݽṹ����Ϊ�ķ�����
 *	ͨ�����ַ��룬�ɴﵽΪһ���������߶�̬����µĲ������������������޸ĵ�Ч����
 */
public class VisitTest {
	public static void main(String[] args) {
		Subject  subject = new MySubject();
		Visitor visitor = new MyVisitor();
		subject.accept(visitor);
	}
}
