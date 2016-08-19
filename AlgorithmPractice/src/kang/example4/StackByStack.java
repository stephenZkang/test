package kang.example4;

import java.util.Stack;

import org.junit.Test;

/**
 * 用一个栈实现另一个栈的排序
 * @author QIAOK
 * @see 2016-08-19
 */
public class StackByStack {
	public void stackByStack(Stack<Integer> stack){
		Stack<Integer> help = new Stack<Integer>();
		while(!stack.isEmpty()){
			Integer cur = stack.pop();
			//如果辅助栈中的元素比栈顶的元素小，则将辅助栈顶的元素放入栈中
			while(!help.isEmpty()&&help.peek()<cur){	//辅助栈中比cur小的元素又全部放入了栈中
				stack.push(help.pop());
			}
			help.push(cur);
		}
		while(!help.isEmpty()){
			stack.push(help.pop());
		}
	}
	
	@Test
	public void stackByStackTest(){
		Stack<Integer> stack = new Stack<Integer>();
		stack.push(2);stack.push(1);stack.push(8);stack.push(6);stack.push(7);
		stackByStack(stack);
		System.out.println(stack.toString());
	}
}
