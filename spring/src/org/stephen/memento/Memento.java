package org.stephen.memento;

public class Memento {
	
	public Memento(String value) {
		this.value = value;
	}

	private String value;
	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
	
	
}
