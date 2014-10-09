package test;

/**
 * @author qiao123
 *	
 *	@see 大量多线程调用导致虚拟机栈溢出的情况
 */
public class MutiThreadTest {
	public void doT(){
		while(true){
			
		}
	}
	
	public void stackThread(){
		while(true){
			Thread thread = new Thread(new Runnable() {
				
				@Override
				public void run() {
					// TODO Auto-generated method stub
					doT();
				}
			});
			thread.start();
		}
	}
	
	public static void main(String[] args) {
		MutiThreadTest test4 = new MutiThreadTest();
		test4.stackThread();
	}
	
}
