package org.stephen.observer;

public class MySubject extends AbstractSubject {

	@Override
	public void operation() {
		System.out.println("MySubject is operating!");
		notifies();
	}

}
