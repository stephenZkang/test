package com.stephen.kang.main;


import java.util.Iterator;

import org.apache.log4j.Logger;
import org.redisson.Config;
import org.redisson.Redisson;
import org.redisson.core.MessageListener;
import org.redisson.core.RList;
import org.redisson.core.RMap;
import org.redisson.core.RQueue;
import org.redisson.core.RSet;
import org.redisson.core.RSortedSet;
import org.redisson.core.RTopic;

/**
 * @author stephenKang
 * @see
 * @since 2015-04-12
 */
public class RedisDemo {
	Logger logger = Logger.getLogger(RedisDemo.class);
	public static void main(String[] args) {
		/**
		 *  初始化REDIS的连接信息
		 *  使用REDISSON连接方式
		 */
		Config config = new Config();
		//设置连接池的大小
		config.setConnectionPoolSize(10);
		config.addAddress("192.168.93.130:6379");
		Redisson redisson = Redisson.create(config);
		System.out.println("redis 连接成功...");
		
		//测试RMap
		RMap<Object,Object> map = redisson.getMap("FirstMap");
		System.out.println(map.get("wangfeng"));
//		map.put("wangfeng", "男");
//		map.put("luoli", "女");
		
		
		//测试set，可以去重复
		RSet<Object> set = redisson.getSet("FirstSet");
//		set.add("大主宰");
//		set.add("大主宰");
		lookCol(set);
		
		
//		RAtomicLong atomicLong = redisson.getAtomicLong("FirstAtomic");
//		atomicLong.addAndGet(1000);
//		System.out.println(atomicLong.getAndDecrement());
		
		//测试SortedSet,排序set
		RSortedSet<Object> sortedSet = redisson.getSortedSet("FirstSortedSet");
		/*sortedSet.add("lisi");
		sortedSet.add("zhangsan");
		sortedSet.add("wangwu");*/
		lookCol(sortedSet);
		
		//测试list，可重复
		RList<Object> list = redisson.getList("FirstList");
		/*list.add("洛漓");
		list.add("洛漓");
		list.add("洛漓");
		list.add("洛漓");*/
		lookCol(list);
		
		RQueue<Object> queue = redisson.getQueue("FirstQueue");
		/*queue.add("分身");
		queue.add("重影");
		queue.add("心宗");
		queue.add("集中");*/
		lookCol(queue);
		
		RTopic<Object> topic = redisson.getTopic("FirstTopic");
		topic.addListener(new MessageListener<Object>() {
			public void onMessage(Object arg0) {
				System.out.println(arg0);
			}
		});
		redisson.shutdown();
	}
	private static void lookCol(RSet<Object> set) {
		Iterator<Object> iterator = set.iterator();
		System.out.println(set.size());
		while(iterator.hasNext()){
			System.err.println(iterator.next());
		}
	}
	
	private static void lookCol(RList<Object> set) {
		Iterator<Object> iterator = set.iterator();
		System.out.println(set.size());
		while(iterator.hasNext()){
			System.err.println(iterator.next());
		}
	}
	
	private static void lookCol(RSortedSet<Object> set) {
		Iterator<Object> iterator = set.iterator();
		System.out.println(set.size());
		while(iterator.hasNext()){
			System.err.println(iterator.next());
		}
	}
	
	private static void lookCol(RQueue<Object> set) {
		Iterator<Object> iterator = set.iterator();
		System.out.println(set.size());
		while(iterator.hasNext()){
			System.err.println(iterator.next());
		}
	}
}
