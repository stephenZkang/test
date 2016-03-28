package org.stephen.factory;

public class SMSSenderFactory implements Provider {

	@Override
	public Sender product() {
		return new SmsSender();
	}

}
