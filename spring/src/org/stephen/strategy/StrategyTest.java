package org.stephen.strategy;

/**
 * ����ģʽ
 * @author qiao123
 *	����ģʽ������һϵ���㷨������ÿ���㷨��װ������ʹ���ǿ����໥�滻�����㷨�ı仯����Ӱ�쵽ʹ���㷨�Ŀͻ���
 *	��Ҫ���һ���ӿڣ�Ϊһϵ��ʵ�����ṩͳһ�ķ��������ʵ����ʵ�ָýӿڣ�
 *	���һ�������ࣨ���п��ޣ����ڸ����ࣩ���ṩ����������
 */
public class StrategyTest {
	public static void main(String[] args) {
		ICalculator calculator = new Plus();
		int result = calculator.calculator("2+8");
		System.out.println("result:"+result);
		
	}
}
