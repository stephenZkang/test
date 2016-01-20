package com.kangzai.exercise.executor;

import java.security.PrivilegedAction;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 * JDK 5.0 提供的线程池
 * @author qiao123
 */
public class ExecutorTest {
	public static void main(String[] args) {
		ExecutorService threadPool = Executors.newFixedThreadPool(10);
		
		
		/**
		 * 从线程池中去线程执行任务，执行完，线程不会关闭
		 */
		threadPool.execute(new Runnable() {
			@Override
			public void run() {
				System.out.println("---- 不忘初心 ----");
			}
		});
		/**
		 * 	java.util.concurrent.RejectedExecutionException
		 * 	线程池关闭，拒绝再次提交任务
		 */
//		threadPool.shutdown();
		
		/**
		 * 提交任务，并且返回结果result
		 */
		String result = null;
		threadPool.submit(new Runnable() {
			@Override
			public void run() {
				System.out.println("---- 勿念、勿忘、舞似 ----");
			}
		}, result);
		
		/**
		 * 线程池发出关闭命令,池内任务全部完成关闭线程池
		 */
		//threadPool.shutdown();
		
		/**
		 * 立即执行任务，关闭线程池
		 */
		/*List<Runnable> now = threadPool.shutdownNow();
		for (Runnable runnable : now) {
			new Thread(runnable).start();
		}*/
		
		Future<String> fu = threadPool.submit(new Callable<String>() {
			@Override
			public String call() throws Exception {
				System.out.println("---- 采桑人 ----");
				return "风云际会";
			}
		});
		
		try {
			String re = fu.get();
			System.out.println(re);
		} catch (InterruptedException e) {
			e.printStackTrace();
		} catch (ExecutionException e) {
			e.printStackTrace();
		}
		
		/**
		 * 测试是否优先执行任务
		 */
		Callable<Object> callable = Executors.callable(new PrivilegedAction<String>() { 
			@Override
			public String run() {
				System.out.println("---- 优先权 ----");
				/*try {
					Thread.sleep(1000*5);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}*/
				System.out.println("---- 等候 ----");
				return "聚焦";
			}
		});
		
		threadPool.submit(callable);
		
		/**
		 * 提交多个任务
		 */
		List<Callable<String>> callables = new ArrayList<Callable<String>>();
		
		for (int i = 0; i < 18; i++) {
			callables.add(new Callable<String>() {
				@Override
				public String call() throws Exception {
					int c =1;
					System.out.println("线程 "+c++);
					return null;
				}
			});
		}
		
		try {
			threadPool.invokeAll(callables);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		threadPool.shutdownNow();
		System.out.println(result);
		System.out.println("线程池是否关闭:"+threadPool.isShutdown());
		
		System.out.println("线程池任务是否完成:"+threadPool.isTerminated());
		
		
	}
}
