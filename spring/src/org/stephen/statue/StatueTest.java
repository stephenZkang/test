package org.stephen.statue;

/**
 * ״̬ģʽ
 * @author qiao123
 *	����˼����ǣ��������״̬�ı�ʱ��ͬʱ�ı�����Ϊ���ܺ���⣡
 *		����QQ��˵���м���״̬�����ߡ�����æµ�ȣ�ÿ��״̬��Ӧ��ͬ�Ĳ�����
 *		������ĺ���Ҳ�ܿ������״̬��
 *		���ԣ�״̬ģʽ�����㣺1������ͨ���ı�״̬����ò�ͬ����Ϊ��2����ĺ�����ͬʱ������ı仯��
 */
public class StatueTest {
	public static void main(String[] args) {
		Statue statue = new Statue();
		Context context = new Context(statue);
		
		statue.setValue("open");
		context.change();
		
		statue.setValue("close");
		context.change();
		
		
	}
}
