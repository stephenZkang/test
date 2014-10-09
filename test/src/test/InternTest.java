package test;

import java.util.ArrayList;
import java.util.List;

/**
 *	@author qiao123
 *
 *	@see 死循环中不断的向字符串常量池中添加对象，导致内存溢出
 *
 *	可以调节-XX:PermSize,-XX:MaxPermSize大小
 */
public class InternTest {
	public static void main(String[] args) {
		List<String> list = new ArrayList<String>();
		int i =0;
		while(true){
			list.add(String.valueOf(i++).intern());
		}
	}
}
