package org.stephen.factory;

public class MailSender implements Sender {

	@Override
	public String send(String message) {
		System.out.println("send mail...");
		return null;
	}

}
