package kang.example2;

import java.util.Stack;

import org.junit.Test;

/**
 * 如何仅用递归函数和栈操作逆序一个栈
 * 		方法一：首先如何逆序一个栈,重新定义一个栈，将已知的栈遍历取出压入新栈即可	 
 * 		方法二：递归逆序
 * 		注释：pop取出栈顶元素，并删除栈顶元素
 * 			peek取出栈顶元素，但不删除栈顶元素
 * @author QIAOK
 * @since 2016-08-19
 *
 */
public class ReverseStack {
	
	/**
	 * 方法一
	 * @param stack
	 * @return
	 */
	public Stack<Integer> reverse(Stack<Integer> stack){
		Stack<Integer> tmp = new Stack<Integer>();
		while(!stack.isEmpty()){
			tmp.push(stack.pop());
		}
		return tmp;
	}
	
	/**
	 * 递归取出栈底元素并删除
	 * @param stack
	 * @return
	 */
	public int getAndRemoveLastElement(Stack<Integer> stack){
		Integer result = stack.pop();
		if(stack.isEmpty()){
			return result;
		}else{
			int last = getAndRemoveLastElement(stack);
			stack.push(result);
			return last;
		}
	}
	
	/**
	 * 方法二：递归逆序	思路：从栈底取元素然后放到栈顶
	 * @param stack
	 */
	public void reverse2(Stack<Integer> stack){
		if(stack.isEmpty()){
			return;
		}
		
		int i = getAndRemoveLastElement(stack);
		reverse2(stack);
		stack.push(i);
	}
	
	
	/**
	 * 测试逆序方法一
	 */
	@Test
	public void reverseTest(){
		Stack<Integer> s1 = new Stack<Integer>();
		s1.push(1);s1.push(2);s1.push(3);s1.push(4);s1.push(5);
		System.out.println(s1.pop());System.out.println(s1.pop());
		System.out.println(s1.toString());
		Stack<Integer> s2 = reverse(s1);
		System.out.println(s2.toString());
		System.out.println(getAndRemoveLastElement(s2));
	}
	
	/**
	 * 测试逆序方法二
	 */
	@Test
	public void reverse2Test(){
		Stack<Integer> s1 = new Stack<Integer>();
		s1.push(1);s1.push(2);s1.push(3);s1.push(4);s1.push(5);
		System.out.println(s1.toString());
		reverse2(s1);
		System.out.println(s1);
		
	}
}
