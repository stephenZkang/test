package org.stephen.prototype;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

/**
 * ԭ��ģʽ
 * @author qiao123
 *
 */
public class Prototype implements Cloneable,Serializable{
	private static final long serialVersionUID = 4229124826390058633L;
	
	/**
	 * ǳ����
	 */
	public Object clone() throws CloneNotSupportedException{
		Prototype prototype =  (Prototype) super.clone();
		return prototype;
	}
	
	/**
	 * ���
	 * @return
	 * @throws IOException
	 * @throws ClassNotFoundException
	 */
	public Object deepClone() throws IOException, ClassNotFoundException{
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		ObjectOutputStream objectOutputStream = new ObjectOutputStream(byteArrayOutputStream);
		objectOutputStream.writeObject(this);
		
		ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(byteArrayOutputStream.toByteArray());
		ObjectInputStream stream = new ObjectInputStream(byteArrayInputStream);
		return stream.readObject();
	}
}
