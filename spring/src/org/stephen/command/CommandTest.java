package org.stephen.command;

/**
 * ÃüÁîÄ£Ê½
 * @author qiao123
 *
 */
public class CommandTest {

	public static void main(String[] args) {
		Receiver receiver = new Receiver();
		Command command = new MyCommand(receiver);
		Invoker invoker = new Invoker(command);
		invoker.invoke();
	}
}
