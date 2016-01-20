package com.kangzai.exercise.thread;

public class PushThread extends Thread {

	@Override
	public void run() {
		Constant.queue.add("A");
		Constant.queue.add("B");
		Constant.queue.add("C");
	}
	
}
