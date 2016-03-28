package org.stephen.iterator;

public class MyCollection implements Collection {
	public String[] s = {"A","B","C","D","E"};
	
	@Override
	public int size() {
		return s.length;
	}

	@Override
	public Object get(int i) {
		return s[i];
	}

	@Override
	public Iterator iterator() {
		return new MyIterator(this);
	}

}
