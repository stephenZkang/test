package com.kangzai.exercise.designer;

/**
 * 单例懒加载模式
 * @author qiao123
 */
public class SingltonA {
	
	private static SingltonA singltonA = null;
	
	private SingltonA(){
	}
	
	public static SingltonA getInstance(){
		if(singltonA == null){
			singltonA = new SingltonA();
		}
		return singltonA;
	}
}
