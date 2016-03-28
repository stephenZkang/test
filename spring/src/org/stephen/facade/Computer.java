package org.stephen.facade;

public class Computer {
	private Cpu cpu;
	private Memory memory;
	private Disk disk;
	public Computer() {
		super();
		cpu = new Cpu();
		memory = new Memory();
		disk = new Disk();
	}

	
	public void startup(){
		System.out.println("the computer is starting up!");
		cpu.startUp();
		memory.startup();
		disk.startup();
	}
	
	
	public void shutdown(){
		System.out.println("the computer is shutting down!");
		cpu.shutdown();
		memory.shutdown();
		disk.shutdown();
	}
}
