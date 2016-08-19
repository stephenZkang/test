package kang.example2;

import java.util.Stack;

import org.junit.Test;

/**
 * ��ν��õݹ麯����ջ��������һ��ջ
 * 		����һ�������������һ��ջ,���¶���һ��ջ������֪��ջ����ȡ��ѹ����ջ����	 
 * 		���������ݹ�����
 * 		ע�ͣ�popȡ��ջ��Ԫ�أ���ɾ��ջ��Ԫ��
 * 			peekȡ��ջ��Ԫ�أ�����ɾ��ջ��Ԫ��
 * @author QIAOK
 * @since 2016-08-19
 *
 */
public class ReverseStack {
	
	/**
	 * ����һ
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
	 * �ݹ�ȡ��ջ��Ԫ�ز�ɾ��
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
	 * ���������ݹ�����	˼·����ջ��ȡԪ��Ȼ��ŵ�ջ��
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
	 * �������򷽷�һ
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
	 * �������򷽷���
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
