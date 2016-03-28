package org.stephen.factory;

public class MailSenderFactory implements Provider{

	@Override
	public Sender product() {
		return new MailSender();
	}

}
