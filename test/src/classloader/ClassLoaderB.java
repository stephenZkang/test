package classloader;

/**
 * 
 * @author qiaok
 * @see 自定义的类加载器ClassLoaderB,并且继承了ClassLoaderA
 *
 */
public class ClassLoaderB extends ClassLoaderA {

	@Override
	public Class<?> loadClass(String name) throws ClassNotFoundException {
		return super.loadClass(name);
	}

}
