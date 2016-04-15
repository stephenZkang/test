package kang.example;

/**
 * ����С������ջ��ʹ�ø���ջ��
 * @author qiao123
 */
public class StackWithMinFun {
	private LinkStack<Integer> stack = new LinkStack<Integer>();
	private LinkStack<Integer> minStack = new LinkStack<Integer>();
	
	//��ȡ����
	public int length(){
		return stack.length();
	}
	
	//��ջ
	public boolean push(int e){
		if(minStack.length() == 0 || e < minStack.peek().e){
			minStack.push(e);
		}else{
			minStack.push(minStack.peek().e);
		}
		stack.push(e);
		return true;
	}
	
	public Integer peek(){
		return stack.peek().e;
	}
	
	//��ջ
	public Integer pop(){
		if(stack.length() == 0){
			throw new RuntimeException("ջΪ��");
		}else{
			minStack.pop();
			return stack.pop().e;
		}
	}
	
	//��Сֵ
	public Integer min(){
		if(stack.length() == 0){
			throw new RuntimeException("ջΪ��");
		}else{
			return minStack.peek().e;
		}
	}
	
	
	public static void main(String[] args) {
		StackWithMinFun stack = new StackWithMinFun();
		stack.push(123);stack.push(12);stack.push(3);stack.push(1);
		System.out.println(stack.min());
		System.out.println(stack.pop());
		System.out.println(stack.min());

	}
}
