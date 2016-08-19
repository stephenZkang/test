package kang.example3;

import org.junit.Test;

/**
 * √®π∑∂”¡–≤‚ ‘
 * @author QIAOK
 * @see 2016-08-19
 */
public class DogCatQueueTest {
	
	@Test
	public void test(){
		DogCatQueue queue = new DogCatQueue();
		Dog dog = new Dog();
		queue.add(dog);
		Cat cat = new Cat();
		queue.add(cat);
		queue.add(cat);
		System.out.println(queue.isDogQueueEmpty());
		System.out.println(queue.isCatQueueEmpty());
		System.out.println(queue.pollCat());
		System.out.println(queue.pollDog());
		System.out.println(queue.isDogQueueEmpty());
		System.out.println(queue.isCatQueueEmpty());
		System.out.println(queue.isEmpty());
		System.out.println(queue.pollAll());

	}
}
