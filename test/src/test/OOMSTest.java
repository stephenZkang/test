package test;

import java.util.ArrayList;
import java.util.List;

/**
 *	@author qiao123
 *	
 *	@see 不断的向list中添加OOMObject对象,造成java堆内存不够用,
 *
 *		发生内存溢出的错误。
 */
public class OOMSTest {
	static class OOMObject{
		private byte[] placeholder = new byte[64*1024];
	}
	
	public static void fill(int num) throws InterruptedException{
		List<OOMObject> list = new ArrayList<OOMSTest.OOMObject>();
		for (int i = 0; i < num; i++) {
			Thread.sleep(50);
			list.add(new OOMObject());
		}
		System.gc();
	}
	
	public static void main(String[] args) throws InterruptedException {
		fill(1000);
//		System.gc();
	}

}
