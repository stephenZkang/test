package org.stephen.builder;

import java.util.ArrayList;
import java.util.List;

import org.stephen.factory.MailSender;
import org.stephen.factory.Sender;
import org.stephen.factory.SmsSender;

/**
 * 建造者模式
 * @author qiao123
 *	建造者模式将很多功能集成到一个类里，
 *	这个类可以创造出比较复杂的东西。所以
 *	与工程模式的区别就是：工厂模式关注的
 *	是创建单个产品，而建造者模式则关注
 *	创建符合对象，多个部分。
 *	因此，是选择工厂模式还是建造者模式，依实际情况而定
 */
public class Builder {
	
	private List<Sender> senders = new ArrayList<Sender>();
	
	public void productMail(int count){
		for (int i = 0; i < count; i++) {
			senders.add(new MailSender());
		}
	}
	
	
	public void productSmS(int count){
		for (int i = 0; i < count; i++) {
			senders.add(new SmsSender());
		}
	}
}
