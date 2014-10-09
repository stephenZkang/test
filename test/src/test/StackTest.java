package test;

/**
 *	@author qiao123
 *
 *	@see dump方法中不断的递归调用本方法,造成虚拟栈深度不足,从而发生
 *		栈溢出错误
 *
 *		解决方法是减小堆内存或者栈容量
 */
public class StackTest {
	int num = 1;
	public void dump(){
		num++;
		dump();
	}
	
	public static void main(String[] args) {
		StackTest test2 = new StackTest();
		try {
			test2.dump();
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			System.out.println("num:"+test2.num);
			e.printStackTrace();
		}
	}
}
