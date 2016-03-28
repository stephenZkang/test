package org.stephen.factory;

/**
 * 静态工厂方法模式
 * @author qiao123
 */
public class StaticSendFactory {
	public static Sender productMail(){
		return new MailSender();
	}
	
	
	public static Sender productSms(){
		return new SmsSender();
	}
	
	public static void main(String[] args) {
		Sender productMail = StaticSendFactory.productMail();
		productMail.send("mail");
	}
}
