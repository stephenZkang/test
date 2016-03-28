package org.stephen.bridge;

public abstract class MyBridge {
	private Sourceable sourceable;
	
	public void method(){
		sourceable.method();
	}

	public Sourceable getSourceable() {
		return sourceable;
	}

	public void setSourceable(Sourceable sourceable) {
		this.sourceable = sourceable;
	}
	
	
	
}
