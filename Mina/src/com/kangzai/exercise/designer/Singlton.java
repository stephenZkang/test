package com.kangzai.exercise.designer;

/**
 * 单例内部类模式
 * @author qiao123
 */
public class Singlton {
	/**
	 * 私有化构造函数，防止别的类创建该对象
	 */
	private Singlton(){
	}
	
	/**
	 * 静态内部类维护实体 
	 * @author qiao123
	 */
	private static class SingltonFactory{
		private static Singlton singlton = new Singlton();
	}
	
	public static Singlton getInstance(){
		return SingltonFactory.singlton;
	}
}
