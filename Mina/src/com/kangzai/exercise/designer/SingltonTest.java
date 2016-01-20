package com.kangzai.exercise.designer;

/**
 * 单例内部类模式多线程测试
 * @author qiao123
 */
public class SingltonTest {
	public static void main(String[] args) {
		for(int i = 0; i <1000;i++){
			new Thread(){
				public void run() {
					Singlton instance = Singlton.getInstance();
					System.out.println(instance);
				};
			}.start();
		}
		
	}
}
