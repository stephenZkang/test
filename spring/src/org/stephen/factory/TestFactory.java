
package org.stephen.factory;

public class TestFactory {
	public static void main(String[] args) {
		Provider smsSenderFactory = new SMSSenderFactory();
		Sender sender = smsSenderFactory.product();
		sender.send("hello");
		
	}
}
