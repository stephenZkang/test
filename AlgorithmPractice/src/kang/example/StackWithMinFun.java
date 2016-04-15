package kang.example;

/**
 * 带最小函数的栈（使用辅助栈）
 * @author qiao123
 */
public class StackWithMinFun {
	private LinkStack<Integer> stack = new LinkStack<Integer>();
	private LinkStack<Integer> minStack = new LinkStack<Integer>();
	
	//获取长度
	public int length(){
		return stack.length();
	}
	
	//入栈
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
	
	//出栈
	public Integer pop(){
		if(stack.length() == 0){
			throw new RuntimeException("栈为空");
		}else{
			minStack.pop();
			return stack.pop().e;
		}
	}
	
	//最小值
	public Integer min(){
		if(stack.length() == 0){
			throw new RuntimeException("栈为空");
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
