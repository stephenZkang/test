package kang.example3;
import java.util.LinkedList;
import java.util.Queue;

/**
 * 猫狗队列：
 * 		用户调用add将cat或dog放入队列
 * 		用户调用pollAll方法，将队列中所有的方法按进队列先后顺序弹出
 * 		用户调用pollDog方法，将队列中dog类的实例按进队列的先后顺序依次弹出
 * 		用户调用pollCat方法，将队列中cat类的视力按进队列先后顺序依次弹出
 * 		用户调用isEmpty方法，检查队列中是否还有dog或cat的实例
 * 		用户调用isDogEmpty方法，检查队列中是否有dog类的实例
 * 		用户调用isCatEmpty方法，检查队列中是否有cat类的实例
 * 
 * 		我的思路，定义一个队列，里面包含一个猫队列，一个狗队列，一个总队列，思路错误：三个队列的更新问题
 * 		正确思路：包装猫狗对象增加时间戳、猫狗队列包含包装的猫狗对象，有一个狗队列和一个猫队列
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
