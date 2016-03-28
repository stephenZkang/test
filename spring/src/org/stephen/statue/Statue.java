package org.stephen.statue;

public class Statue {
	private String value;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	
	public void open(){
		System.out.println("the machine is opening!");
	}
	
	public void close(){
		System.out.println("the machine is closing!");
	}
}
