package test;

import org.junit.Test;

import classloader.ClassLoaderA;
import classloader.ClassLoaderB;
import classloader.DomainA;

/**
 * 
 * @author qiaok
 * @see 测试类加载器对实例化类的影响
 * 
 */
public class TestClassLoadler {
	
	@Test
	public void test() throws ClassNotFoundException, InstantiationException, IllegalAccessException{
		//自定义的类加载器ClassLoaderA
		ClassLoaderA classLoaderA = new ClassLoaderA();
		Class<?> A = classLoaderA.loadClass("classloader.DomainA");
		Object obj = A.newInstance();
		
		System.out.println(obj instanceof DomainA);
		
		//自定义的类加载器ClassLoaderB
		ClassLoaderB classLoaderB = new ClassLoaderB();
		Class<?> B = classLoaderB.loadClass("classloader.DomainA");
		Object object = B.newInstance();
		
		System.out.println(object instanceof DomainA);
		
		
	}
}
