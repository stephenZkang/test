package org.stephen.singleton;

/**
 * 
 * @author qiao123
 *	synchronized关键字锁住的是这个对象，这样的用法，在性能上会有所下降，因为每次调用getInstance()，
 *	都要对对象上锁，事实上，只有在第一次创建对象的时候需要加锁，之后就不需要了，所以，这个地方需要改进。我们改成下面这个：
 */
public class SecSingleton {
	private static SecSingleton secSingleton = null;
	private SecSingleton() {
	}
	
	public static synchronized SecSingleton getInstance(){
		if(secSingleton ==null){
			secSingleton = new SecSingleton();
		}
		return secSingleton;
	}
	
}
