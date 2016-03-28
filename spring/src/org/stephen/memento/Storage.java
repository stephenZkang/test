package org.stephen.memento;

public class Storage {
	private Memento memento;
	
	public Memento getMemento() {
		return memento;
	}

	public Storage(Memento memento) {
		this.memento = memento;
	}

	public void setMemento(Memento memento) {
		this.memento = memento;
	}
	
	
	
	
}
