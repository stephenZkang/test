package com.kangzai.exercise.thread;

import java.util.Queue;

public class PullThread extends Thread {

	@Override
	public void run() {
		
		/*while(Constant.queue.peek() != null){
			System.out.println(Constant.queue.peek());
			Constant.queue.poll();
		}*/
		
		Queue<String> q =  Constant.queue;
		for (String el : q) {
			System.out.println(this.getName()+" 元素: "+el);
			
		}
	}
	
}
