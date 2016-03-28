package org.stephen.flyweight;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Vector;

/**
 * 亨元模式
 * @author qiao123
 *	通过连接池的管理，实现了数据库连接的共享，不需要每一次都重新创建连接，节省了数据库重新创建的开销，提升了系统的性能！
 *	享元模式的主要目的是实现对象的共享，即共享池，当系统中对象多的时候可以减少内存的开销，通常与工厂模式一起使用
 */
public class ConnectionPool {
	private Vector<Connection> pool;
	private String username;
	private String url;
	private String password;
	private String className;
	
	private int poolSize = 100;
	private static ConnectionPool instance = null;
	Connection conn = null;
	private ConnectionPool() {
		pool = new Vector<Connection>(poolSize);
		
		for (int i = 0; i < poolSize; i++) {
			try {
				Class.forName(className);
				conn = DriverManager.getConnection(url, username, password);
				pool.add(conn);
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
	public static ConnectionPool getInstance(){
		if(instance == null){
			instance = new ConnectionPool();
		}
		return instance;
	}
	
	public synchronized void release(){
		pool.add(conn);
	}
	
	public synchronized Connection getConnection(){
		if(pool.size()>0){
			Connection conn = pool.get(0);
			pool.remove(conn);
			return conn;
		}else{
			return null;
		}
	}
	
	
	
}
