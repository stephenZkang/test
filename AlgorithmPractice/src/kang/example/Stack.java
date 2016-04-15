package kang.example;

/**
 * 	基于数组实现
 * @author qiao123
 *
 */
@SuppressWarnings("unchecked")
public class Stack<E> {
	
	private Object[] data;
	private int maxSize = 0;	//栈容量
	private int top = -1;		//栈顶指针
	
	
	
	public Stack() {
		this(10);
	}
	
	public Stack(int initialSize) {
		if(initialSize>=0){
			this.maxSize = initialSize;
			data = new Object[initialSize];
			top = -1;
		}else{
			throw new RuntimeException("初始化大小不能小于0："+initialSize);
		}
	}

	//入栈
	public boolean push(E e){
		if(top == maxSize -1){
			throw new RuntimeException("栈已满");
		}else{
			data[++top] = e;
			return true;
		}
	}
	
	//出栈
	public E pop(){
		if(empty()){
			throw new RuntimeException("空栈异常");
		}else{
			return (E)data[top--];
		}
	}

	//查看栈顶元素,但不删除
	public E peek(){
		if(empty()){
			throw new RuntimeException("空栈异常");
		}else{
			return (E) data[top];
		}
	}
	
	//判空
	public boolean empty() {
		return top == -1 ? true:false;
	}
	
	//测试
	public static void main(String[] args) {
		Stack<String> stack = new Stack<String>();
		stack.push("i");stack.push("love");stack.push("you");
		System.out.println(stack.top);
		System.out.println(stack.maxSize);
		System.out.println(stack.peek());
		System.out.println(stack.pop());
		System.out.println(stack.pop());
		System.out.println(stack.pop());
		System.out.println(stack.top);
		
	}	
}
