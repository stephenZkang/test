package org.stephen.visit;

public interface Subject {
	public void accept(Visitor visitor);
	
	public String getSubject();
}
