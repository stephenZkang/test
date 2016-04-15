package kang.example;


/**
 * ��������ʵ���Զ���ջ
 * 
 * @author qiao123
 */
public class LinkStack<E> {
	//ջ��
	private Node<E> top;
	//ջ��С
	private int size;
	
	//��ջ
	public boolean push(E e){
		top = new Node<E>(e,top);
		size ++;
		return true;
	}
	
	//ջ��С
	public int length(){
		return size;
	}

	//�жϿ�
	public boolean empty(){
		return size == 0;
	}
	
	//ȡջ����ֵ
	public Node<E> peek(){
		if(empty()){
			return null;
		}else{
			return top;
		}
	}
	
	//��ջ
	public Node<E> pop(){
		if(empty()){
			throw new RuntimeException("��ջ�쳣");
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
	
	//����
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
