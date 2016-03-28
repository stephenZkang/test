package org.stephen.strategy;

public class Minus extends AbstractCalculator implements ICalculator {

	@Override
	public int calculator(String exp) {
		int[] split = split(exp, "\\-");
		return split[0] - split[1];
	}

}
