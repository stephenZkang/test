package kang.example3;

/**
 * 猫狗队列：带时间戳的宠物队列
 * @author QIAOK
 * @see 2016-08-19
 */
public class PetEnterQueue {
	private Pet pet;
	private long count;
	public PetEnterQueue(Pet pet, long count) {
		this.pet = pet;
		this.count = count;
	}
	public Pet getPet() {
		return pet;
	}
	public long getCount() {
		return count;
	}
	
	public String getEnterPetType(){
		return this.pet.getType();
	}
	
}
