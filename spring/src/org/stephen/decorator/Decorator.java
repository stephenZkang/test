package org.stephen.decorator;

/**
 * 装饰者模式
 * @author qiao123
 *	装饰器模式的应用场景：
 *		1、需要扩展一个类的功能。
 *		2、动态的为一个对象增加功能，而且还能动态撤销。（继承不能做到这一点，继承的功能是静态的，不能动态增删。）
 *		缺点：产生过多相似的对象，不易排错！
 */
public class Decorator implements Sourceable {
	private Sourceable source;
	public Decorator(Sourceable source) {
		this.source = source;
	}



	@Override
	public void method1() {
		System.out.println("before the method1!");
		source.method1();
		System.out.println("after the method2!");
	}

}
