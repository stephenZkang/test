package org.stephen.strategy;

public abstract class AbstractCalculator {
	public int[] split(String exp,String opt){
		String[] split = exp.split(opt);
		int[] arrayInt = new int[2];
		arrayInt[0] = Integer.parseInt(split[0]);
		arrayInt[1] = Integer.parseInt(split[1]);
		return arrayInt;
	}
}
