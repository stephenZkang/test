package com.extdemo.test;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;

import org.junit.Test;

import com.extdemo.model.Person;

public class PersonTest {
	
	@Test
	public void test(){
		List<Person> list = new ArrayList<Person>();
		Person p1 = new Person();
		p1.setId(1);p1.setName("周星驰");p1.setAge(45);p1.setEmail("xingye@gmail.com");
		list.add(p1);
		Person p2 = new Person();
		p2.setId(2);p2.setName("周润发");p2.setAge(57);p2.setEmail("fage@gmail.com");
		list.add(p2);
		Person p3 = new Person();
		p3.setId(3);p3.setName("刘德华");p3.setAge(55);p3.setEmail("huazai@gmail.com");
		list.add(p3);
		Person p4 = new Person();
		p4.setId(4);p4.setName("张国荣");p4.setAge(57);p4.setEmail("guorong@gmail.com");
		list.add(p4);
		
		System.out.println(JSONArray.fromObject(list).toString());
	}
}
