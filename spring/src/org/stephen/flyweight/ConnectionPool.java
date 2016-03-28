package org.stephen.flyweight;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Vector;

/**
 * ��Ԫģʽ
 * @author qiao123
 *	ͨ�����ӳصĹ���ʵ�������ݿ����ӵĹ�������Ҫÿһ�ζ����´������ӣ���ʡ�����ݿ����´����Ŀ�����������ϵͳ�����ܣ�
 *	��Ԫģʽ����ҪĿ����ʵ�ֶ���Ĺ���������أ���ϵͳ�ж�����ʱ����Լ����ڴ�Ŀ�����ͨ���빤��ģʽһ��ʹ��
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
