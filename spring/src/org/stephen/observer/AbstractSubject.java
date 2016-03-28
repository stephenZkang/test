package org.stephen.observer;

import java.util.Enumeration;
import java.util.Vector;

public abstract class AbstractSubject implements Subject {
	private Vector<Observer> vector = new Vector<Observer>();
	@Override
	public void add(Observer observer) {
		vector.add(observer);
	}

	@Override
	public void remove(Observer observer) {
		vector.remove(observer);
	}

	@Override
	public void notifies() {
		Enumeration<Observer> elements = vector.elements();
		while(elements.hasMoreElements()){
			Observer observer = elements.nextElement();
			observer.update();
		}
	}

}
