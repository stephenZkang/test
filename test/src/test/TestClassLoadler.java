package test;

import java.io.IOException;
import java.io.InputStream;

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
	
	public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException {
		//自定义的类加载器ClassLoaderA
		ClassLoaderA classLoaderA = new ClassLoaderA();
		Class<?> A = classLoaderA.loadClass("classloader.DomainA");
		Object obj = A.newInstance();
		
		System.out.println(obj instanceof DomainA);
		
		//自定义的类加载器ClassLoaderB
		ClassLoaderB classLoaderB = new ClassLoaderB();
		Class<?> B = classLoaderB.loadClass("classloader.DomainA");
		Object object = B.newInstance();
		System.out.println(object.getClass().getClassLoader());
		System.out.println(DomainA.class.getClassLoader());
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
					byte[] b = new byte[inputStream.available()];
					inputStream.read(b);
					return defineClass(name, b, 0,b.length);
				} catch (IOException e) {
					throw new ClassNotFoundException(name);
				}
			}
		};
		
		/**
		 *  test.TestClassLoadler类文件有System ClassLoader加载
		 *  使用classLoader加载两个是不同的加载机制
		 *  
		 *  instanceof 判断机制是getClass()和getClassLoader()的机制都相同
		 *  
		 */
		Object object2 = classLoader.loadClass("test.TestClassLoadler").newInstance();
		System.out.println(object2.getClass());
		System.out.println(object2.getClass().getClassLoader());
		System.out.println(test.TestClassLoadler.class.getClassLoader());
		System.out.println(object2 instanceof  test.TestClassLoadler);
	}
}
