package org.stephen.factory;

/**
 * 普通工厂模式
 * @author qiao123
 *
 */
public class SimpleSendFactory {
	
	private SimpleSendFactory() {
	}
	
	
	public static SimpleSendFactory getInstance(){
		return new SimpleSendFactory();
	}
	public Sender productSender(String type){
		if("mail".equals(type)){
			return new MailSender();
		}else if("sms".equals(type)){
			return new SmsSender();
		}
		return null;
	}
	public static void main(String[] args) {
		SimpleSendFactory factory = SimpleSendFactory.getInstance();
		Sender sender = factory.productSender("mail");
		sender.send("hellp");
		
	}
}
