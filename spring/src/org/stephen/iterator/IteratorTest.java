package org.stephen.iterator;

/**
 * ������ģʽ
 * @author qiao123
 *	������ģʽ����˳����ʾۼ��еĶ���
 *	һ����˵�������зǳ�����������Լ�����Ƚ���Ϥ�Ļ�����Ȿģʽ��ʮ�����ɡ�
 *	��仰����������˼��һ����Ҫ�����Ķ��󣬼��ۼ����󣬶��ǵ������������ڶԾۼ�������б������ʡ�
 */
public class IteratorTest {
	public static void main(String[] args) {
		Collection collection = new MyCollection();
		Iterator iterator = collection.iterator();
		while(iterator.hasNext()){
			System.out.println(iterator.next());
		}
	}
}
