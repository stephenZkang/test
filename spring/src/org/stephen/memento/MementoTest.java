package org.stephen.memento;

/**
 * 备忘录模式
 * @author qiao123
 *	主要目的是保存一个对象的某个状态，以便在适当的时候恢复对象，
 *	个人觉得叫备份模式更形象些，通俗的讲下：
 *		假设有原始类A，A中有各种属性，A可以决定需要备份的属性，
 *		备忘录类B是用来存储A的一些内部状态，类C呢，就是一个用来存储备忘录的，
 *		且只能存储，不能修改等操作。
 */
public class MementoTest {
	public static void main(String[] args) {
		Original original = new Original("open");
		Memento memento = original.createMemento();
		Storage storage = new Storage(memento);
		
		System.out.println("修改原始状态前："+original.getValue());
		original.setValue("close");
		System.out.println("修改原始状态后："+original.getValue());
		
		original.restoreMemento(storage.getMemento());
		System.out.println("恢复原始状态后："+original.getValue());
	}
}
