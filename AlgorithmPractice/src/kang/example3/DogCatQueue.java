package kang.example3;
import java.util.LinkedList;
import java.util.Queue;

/**
 * è�����У�
 * 		�û�����add��cat��dog�������
 * 		�û�����pollAll�����������������еķ������������Ⱥ�˳�򵯳�
 * 		�û�����pollDog��������������dog���ʵ���������е��Ⱥ�˳�����ε���
 * 		�û�����pollCat��������������cat����������������Ⱥ�˳�����ε���
 * 		�û�����isEmpty���������������Ƿ���dog��cat��ʵ��
 * 		�û�����isDogEmpty���������������Ƿ���dog���ʵ��
 * 		�û�����isCatEmpty���������������Ƿ���cat���ʵ��
 * 
 * 		�ҵ�˼·������һ�����У��������һ��è���У�һ�������У�һ���ܶ��У�˼·�����������еĸ�������
 * 		��ȷ˼·����װè����������ʱ�����è�����а�����װ��è��������һ�������к�һ��è����
 * @author QIAOK
 * @see 2016-08-19
 */
public class DogCatQueue {
	private Queue<PetEnterQueue> dogQ;
	private Queue<PetEnterQueue> catQ;
	private long count;
	public DogCatQueue() {
		super();
		this.dogQ = new LinkedList<PetEnterQueue>();
		this.catQ = new LinkedList<PetEnterQueue>();
		this.count = 0;
	}
	
	public void add(Pet pet){
		if(pet.getType().equals("dog")){
			this.dogQ.add(new PetEnterQueue(pet, this.count++));
		}else if(pet.getType().equals("cat")){
			this.catQ.add(new PetEnterQueue(pet, this.count++));
		}else{
			throw new RuntimeException("err,not dog or not cat");
		}
	}
	
	public Pet pollAll(){
		if(!this.dogQ.isEmpty()&&!this.catQ.isEmpty()){
			if(this.dogQ.peek().getCount()>this.catQ.peek().getCount()){
				PetEnterQueue petEnterQueue = this.dogQ.poll();
				System.out.println(petEnterQueue.getCount());
				return petEnterQueue.getPet();
			}else{
				PetEnterQueue petEnterQueue = this.catQ.poll();
				System.out.println(petEnterQueue.getCount());
				return petEnterQueue.getPet();
			}
		}else if(!this.dogQ.isEmpty()){
			PetEnterQueue petEnterQueue = this.dogQ.poll();
			System.out.println(petEnterQueue.getCount());
			return petEnterQueue.getPet(); 
		}else if(!this.catQ.isEmpty()){
			PetEnterQueue petEnterQueue = this.catQ.poll();
			System.out.println(petEnterQueue.getCount());
			return petEnterQueue.getPet();
		}else{
			throw new RuntimeException("error,queue is empty");
		}
	}
	
	public Dog pollDog(){
		if(!this.isDogQueueEmpty()){
			PetEnterQueue petEnterQueue = this.dogQ.poll();
			System.out.println(petEnterQueue.getCount());
			return (Dog)petEnterQueue.getPet();
		}else{
			throw new RuntimeException("error,Dog queue is empty");
		}
	}
	
	public Cat pollCat(){
		if(!this.isCatQueueEmpty()){
			PetEnterQueue petEnterQueue = this.catQ.poll();
			System.out.println(petEnterQueue.getCount());
			return (Cat)petEnterQueue.getPet() ;
		}else{
			throw new RuntimeException("error,Cat queue is empty");
		}
	}

	public boolean isCatQueueEmpty() {
		return this.catQ.isEmpty();
	}

	public boolean isDogQueueEmpty() {
		return this.dogQ.isEmpty();
	}
	
	
	public boolean isEmpty(){
		return this.dogQ.isEmpty()&&this.catQ.isEmpty();
	}
	
}
