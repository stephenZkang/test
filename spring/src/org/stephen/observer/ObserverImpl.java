package org.stephen.observer;

public class ObserverImpl implements Observer {

	@Override
	public void update() {
		System.out.println("ObserverImpl is updating!");
	}

}
