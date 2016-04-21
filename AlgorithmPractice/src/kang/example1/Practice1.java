package kang.example1;

import java.math.BigDecimal;

/**
 * 
 * 求两个大的数字相加[面试之一]
 * @author qiao123
 */
public class Practice1 {

	//测试
	public static void main(String[] args) {
		String a = "22222222";
		String b = "22222222";
		String result = add(a, b);
		System.out.println("result:"+result);
		
		a = "22222222222222222222222222222222222222222222222222222222.2";
		b = "22222222222222222222222222222222222222222222222222222222";
		result = add(a, b);
		System.out.println("result:"+result);
	}
	
	public static String add(String a,String b){
		//Integer 抛异常:java.lang.NumberFormatException: For input string: "2222222222222222222222222222"
		/*int i = Integer.parseInt(a);
		int j = Integer.parseInt(b);
		return Integer.toString(i+j);*/
		BigDecimal result = new BigDecimal(a).add(new BigDecimal(b));
		return result.toString();
	}
}
