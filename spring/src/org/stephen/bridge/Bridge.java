package org.stephen.bridge;

public class Bridge extends MyBridge{

	@Override
	public void method() {
		getSourceable().method();
	}
	
}
