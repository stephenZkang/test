package org.stephen.singleton;

/**
 * 单例模式
 * @author qiao123
 *	这个类可以满足基本要求，
 *	但是，像这样毫无线程安全保护的类，
 *	如果我们把它放入多线程的环境下，肯定就会出现问题了，
 *	如何解决？我们首先会想到对getInstance方法加synchronized关键字，
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
