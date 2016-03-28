package org.stephen.factory;

public class SmsSender implements Sender {

	@Override
	public String send(String message) {
		System.out.println("send SMS...");
		return null;
	}

}
