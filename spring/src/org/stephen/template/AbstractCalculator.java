package org.stephen.template;

public abstract class AbstractCalculator {
	/**
	 * 主方法，实现对其他子类的调用
	 * @param exp
	 * @param opt
	 * @return
	 */
	public int calculate(String exp,String opt){
		int[] arrayInt = split(exp,opt);
		return calculate(arrayInt[0],arrayInt[1]);
	}

	public abstract int calculate(int i, int j);

	private int[] split(String exp, String opt) {
		String[] array = exp.split(opt);
		int[] arrayInt = new int[2];
		arrayInt[0] = Integer.parseInt(array[0]);
		arrayInt[1] = Integer.parseInt(array[1]);
		return arrayInt;
	}
	
	
	
}
