package classloader;

import java.io.IOException;
import java.io.InputStream;

/**
 * 
 * @author qiaok
 * 自定义的ClassLoaderA类加载器
 * 自定义类加载器需要重写loadClass方法，自己读取Class文件加载到VM中去.
 * 
 */
public class ClassLoaderA extends ClassLoader {

	@Override
	public Class<?> loadClass(String name) throws ClassNotFoundException {
		// TODO Auto-generated method stub
		try {
			String fileName = name.substring(name.lastIndexOf(".")+1)+ ".class";
			InputStream stream = getClass().getResourceAsStream(fileName);
			if(stream == null){
				return super.loadClass(name);
			}
			byte[] b = new byte[stream.available()];
			stream.read(b);
			/**
			 * 将class文件加载到JVM中去
			 */
			return defineClass(name, b, 0, b.length);
		} catch (IOException e) {
			throw new ClassNotFoundException(name);
		}
	}

	
}
