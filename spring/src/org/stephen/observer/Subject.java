package org.stephen.observer;

/**
 * �۲���ģʽ
 * @author qiao123
 *	���۲��ߣ����⣩
 */
public interface Subject {
	
	
	public void add(Observer observer);
	
	public void remove(Observer observer);
	
	public void notifies();
	
	public void operation();
}
