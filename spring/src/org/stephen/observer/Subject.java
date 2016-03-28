package org.stephen.observer;

/**
 * 观察者模式
 * @author qiao123
 *	被观察者（主题）
 */
public interface Subject {
	
	
	public void add(Observer observer);
	
	public void remove(Observer observer);
	
	public void notifies();
	
	public void operation();
}
