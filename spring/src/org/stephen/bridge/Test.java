package org.stephen.bridge;

/**
 * 
 * @author qiao123
 *	�Ž�ģʽ���ǰ�����������ʵ�ַֿ���
 *		ʹ���ǿ��Ը��Զ����ı仯���Žӵ������ǣ�
 *		��������ʵ�ֻ����ʹ�ö��߿��Զ����仯��
 *		�����ǳ��õ�JDBC��DriverManagerһ����
 *		JDBC�����������ݿ��ʱ���ڸ������ݿ�֮������л���
 *		��������Ҫ��̫��Ĵ��룬����˿�����ö���ԭ�����JDBC�ṩͳһ�ӿڣ�
 *		ÿ�����ݿ��ṩ���Ե�ʵ�֣���һ���������ݿ������ĳ������ŽӾ����ˡ�
 */
public class Test {
	public static void main(String[] args) {
		Bridge bridge = new Bridge();
		Sourceable sourceable = new SourceSub();
		bridge.setSourceable(sourceable);
		bridge.method();
	}
}
