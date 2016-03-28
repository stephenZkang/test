package org.stephen.decorator;

/**
 * 装饰模式
 * @author qiao123
 *	被装饰的类
 */
public class Source implements Sourceable {

	@Override
	public void method1() {
		System.out.println("this is the method of the source!");
	}

}
