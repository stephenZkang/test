package test;

import java.io.IOException;
import java.io.InputStream;

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
		
		
		ClassLoader classLoader = new ClassLoader() {
			@Override
			public Class<?> loadClass(String name)
					throws ClassNotFoundException {
				try {
					String fileName = name.substring(name.lastIndexOf(".")+1)+".class";
					InputStream inputStream = getClass().getResourceAsStream(fileName);
					if(inputStream == null){
						return super.loadClass(name);
					}
					byte[] b;
					b = new byte[inputStream.available()];
					inputStream.read(b);
					return defineClass(name, b, 0,b.length);
				} catch (IOException e) {
					throw new ClassNotFoundException();
				}
			}
		};
		
		
		Object object2 = classLoader.loadClass("classloader.DomainA").newInstance();
		System.out.println(object2.getClass());
		System.out.println(object2 instanceof classloader.DomainA);
		
	}
}
