package org.stephen.factory;

/**
 * 多个工厂方法模式
 * @author qiao123
 *
 */
public class MutiSendFactory {
	
	
	private MutiSendFactory() {
	}

	public static MutiSendFactory getInstance(){
		return new MutiSendFactory();
	}
	
	public Sender productMailSender(){
		return new MailSender();
	}
	
	public Sender productSmsSender(){
		return new SmsSender();
	}
	
	public static void main(String[] args) {
		MutiSendFactory mutiSendFactory = MutiSendFactory.getInstance();
		Sender mailSender = mutiSendFactory.productMailSender();
		mailSender.send("hello");
	}
}
