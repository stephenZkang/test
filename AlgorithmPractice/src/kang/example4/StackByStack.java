package kang.example4;

import java.util.Stack;

import org.junit.Test;

/**
 * ��һ��ջʵ����һ��ջ������
 * @author QIAOK
 * @see 2016-08-19
 */
public class StackByStack {
	public void stackByStack(Stack<Integer> stack){
		Stack<Integer> help = new Stack<Integer>();
		while(!stack.isEmpty()){
			Integer cur = stack.pop();
			//�������ջ�е�Ԫ�ر�ջ����Ԫ��С���򽫸���ջ����Ԫ�ط���ջ��
			while(!help.isEmpty()&&help.peek()<cur){	//����ջ�б�curС��Ԫ����ȫ��������ջ��
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
