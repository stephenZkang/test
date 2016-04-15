package kang.example;


/**
 * 基于链表实现自定义栈
 * 
 * @author qiao123
 */
public class LinkStack<E> {
	//栈顶
	private Node<E> top;
	//栈大小
	private int size;
	
	//入栈
	public boolean push(E e){
		top = new Node<E>(e,top);
		size ++;
		return true;
	}
	
	//栈大小
	public int length(){
		return size;
	}

	//判断空
	public boolean empty(){
		return size == 0;
	}
	
	//取栈顶的值
	public Node<E> peek(){
		if(empty()){
			return null;
		}else{
			return top;
		}
	}
	
	//出栈
	public Node<E> pop(){
		if(empty()){
			throw new RuntimeException("空栈异常");
		}else{
			Node<E> value = top;
			top = top.next;
			value.next=null;
			size --;
			return value;
		}
	} 
	
	@SuppressWarnings("hiding")
	class Node<E>{
		E e;
		Node<E> next;
		
		public Node(E e,Node<E> next){
			this.e = e;
			this.next = next;
		}
	}
	
	//测试
	public static void main(String[] args) {
		LinkStack<String> stack = new LinkStack<String>();
		stack.push("hello");stack.push("world");stack.push("judy");
		System.out.println(stack.empty());
		System.out.println(stack.size);
		System.out.println(stack.peek().e);
		System.out.println(stack.pop().e);
		System.out.println(stack.pop().e);
		System.out.println(stack.pop().e);
//		System.out.println(stack.pop().e);
		System.out.println(stack.empty());
		System.out.println(stack.size);
		
	}
}
