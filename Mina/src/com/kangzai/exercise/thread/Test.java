package com.kangzai.exercise.thread;

import java.util.Queue;
import java.util.Stack;
import java.util.concurrent.LinkedBlockingDeque;

public class Test {
	public static void main(String[] args) {
		
		/**
		 * 一个线程向队列里存，一个线程从队列里取
		 */
		Thread thread = new PushThread();
		thread.start();
		try {
			Thread.sleep(1000*5);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		for(int i= 0;i<100;i++){
			Thread thread2 = new PullThread();
			thread2.start();
		}
		
		Queue<String> q = new LinkedBlockingDeque<String>();
		q.add("A");
		q.add("B");
		q.add("C");
		/**
		 * peek 返回队列的最顶端
		 * poll 删除队列最顶端
		 */
		while(q.peek() != null){
			System.out.println(q.peek());
			q.poll();
		}
		
		Stack<String> stack = new Stack<String>();
		
		stack.add("A");
		stack.add("B");
		stack.add("C");
		while(!stack.isEmpty()){
			System.out.println(stack.peek());
			stack.pop();
		}
	}
	
}
