package com.xstream.test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.thoughtworks.xstream.XStream;
import com.xstream.model.Book;
import com.xstream.model.Person;
import com.xstream.model.School;

public class XStreamTest {
	public static void main(String[] args) {
		XStream stream = new XStream();
		stream.processAnnotations(Person.class);
		
//		toXml(stream);
//		fromXml(stream);
		stream.processAnnotations(School.class);
//		School school = new School();
//		school.setS_name("清华附中");
//		System.out.println(stream.toXML(school));
		
		String xml="<School><s_name>清华附中</s_name></School>";
		School fromXML = (School) stream.fromXML(xml);
		System.err.println(fromXML.getS_name());
	}

	public static void fromXml(XStream stream) {
		String xml = "<Person>"
				+ "<name>梅西</name>"
				+ "<age>12</age>"
				+ "<email>meixi@gmial.com</email>"
				+ "<book name='pride'/>"
						+ "<map haha='xixi' ha__ha='xixi' haa='xixi' ha__aa='xixi'/>"
								+ "</Person>";
		Person object = (Person) stream.fromXML(xml);
		Map<String, String> map = object.getMap();
		Set<String> keySet = map.keySet();
		for (String string : keySet) {
			System.out.println(string+":"+map.get(string));
		}
	}

	public static void toXml(XStream stream) {
		Person person = new Person();
		person.setAge(12);person.setName("梅西");person.setEmail("meixi@gmial.com");
		Map<String, String> map = new HashMap<String,String>();
		map.put("ha_ha", "xixi");
		map.put("haha", "xixi");
		map.put("haa", "xixi");
		map.put("ha_aa", "xixi");
		person.setMap(map);
		
		List<Book> list = new ArrayList<Book>();
		Book book = new Book();
		book.setName("pride");
		list.add(book);
		person.setBooks(list);
		String xml = stream.toXML(person);
		System.out.println(xml);
	}
}
