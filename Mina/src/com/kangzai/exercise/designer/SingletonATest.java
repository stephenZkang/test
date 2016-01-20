package com.kangzai.exercise.designer;

/**
 * 单例懒加载方式多线程测试
 * @author qiao123
 */
public class SingletonATest {
	public static void main(String[] args) {
		for(int i = 0;i < 1000;i++){
			new Thread(){
				public void run() {
					System.out.println(SingltonA.getInstance());
				};
			}.start();
		}
	}
}
