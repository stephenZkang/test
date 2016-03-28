package org.stephen.command;

public class Invoker {
	private Command command;
	
	public Invoker(Command command) {
		super();
		this.command = command;
	}



	public void invoke(){
		System.out.println("invoker send command");
		command.exec();
	}
	
	
}
