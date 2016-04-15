package kang.example;

/**
 * 	��������ʵ��
 * @author qiao123
 *
 */
@SuppressWarnings("unchecked")
public class Stack<E> {
	
	private Object[] data;
	private int maxSize = 0;	//ջ����
	private int top = -1;		//ջ��ָ��
	
	
	
	public Stack() {
		this(10);
	}
	
	public Stack(int initialSize) {
		if(initialSize>=0){
			this.maxSize = initialSize;
			data = new Object[initialSize];
			top = -1;
		}else{
			throw new RuntimeException("��ʼ����С����С��0��"+initialSize);
		}
	}

	//��ջ
	public boolean push(E e){
		if(top == maxSize -1){
			throw new RuntimeException("ջ����");
		}else{
			data[++top] = e;
			return true;
		}
	}
	
	//��ջ
	public E pop(){
		if(empty()){
			throw new RuntimeException("��ջ�쳣");
		}else{
			return (E)data[top--];
		}
	}

	//�鿴ջ��Ԫ��,����ɾ��
	public E peek(){
		if(empty()){
			throw new RuntimeException("��ջ�쳣");
		}else{
			return (E) data[top];
		}
	}
	
	//�п�
	public boolean empty() {
		return top == -1 ? true:false;
	}
	
	//����
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
