package org.stephen.adaptor;

/**
 * 测试类
 * @author qiao123
 *
 */
public class Test {
	public static void main(String[] args) {
		//类适配器模式
		Targetable adapter = new Adapter();
		adapter.method1();
		adapter.method2();
		
		//对象适配器模式
		Source source = new Source();
		Targetable targetable = new Wrapper(source);
		targetable.method1();
		targetable.method2();
	}
}
