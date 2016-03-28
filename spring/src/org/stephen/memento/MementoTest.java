package org.stephen.memento;

/**
 * ����¼ģʽ
 * @author qiao123
 *	��ҪĿ���Ǳ���һ�������ĳ��״̬���Ա����ʵ���ʱ��ָ�����
 *	���˾��ýб���ģʽ������Щ��ͨ�׵Ľ��£�
 *		������ԭʼ��A��A���и������ԣ�A���Ծ�����Ҫ���ݵ����ԣ�
 *		����¼��B�������洢A��һЩ�ڲ�״̬����C�أ�����һ�������洢����¼�ģ�
 *		��ֻ�ܴ洢�������޸ĵȲ�����
 */
public class MementoTest {
	public static void main(String[] args) {
		Original original = new Original("open");
		Memento memento = original.createMemento();
		Storage storage = new Storage(memento);
		
		System.out.println("�޸�ԭʼ״̬ǰ��"+original.getValue());
		original.setValue("close");
		System.out.println("�޸�ԭʼ״̬��"+original.getValue());
		
		original.restoreMemento(storage.getMemento());
		System.out.println("�ָ�ԭʼ״̬��"+original.getValue());
	}
}
