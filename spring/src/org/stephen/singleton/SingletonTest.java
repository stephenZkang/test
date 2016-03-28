package org.stephen.singleton;

public class SingletonTest {
	public static void main(String[] args) {
		//���̲߳���
		//single();
		//���̲߳���
		muti();
	}

	private static void muti() {
		for (int i = 0; i < 100; i++) {
			Thread thread = new Thread(new Runnable() {
				@Override
				public void run() {
					//single();
					secSingle();
				}
			});
			thread.start();
		}
	}

	public static void single() {
		Singleton instance = Singleton.getInstance();
		System.out.println(instance);
	}
	
	public static void secSingle() {
		SecSingleton instance = SecSingleton.getInstance();
		System.out.println(instance);
	}
}
