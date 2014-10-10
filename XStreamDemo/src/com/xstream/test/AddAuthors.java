package com.xstream.test;

import java.io.File;
import java.util.List;

import com.thoughtworks.xstream.persistence.FilePersistenceStrategy;
import com.thoughtworks.xstream.persistence.PersistenceStrategy;
import com.thoughtworks.xstream.persistence.XmlArrayList;
import com.xstream.model.Author;

public class AddAuthors {
	/**
	 * 不成功
	 * @param args
	 */
	public static void main(String[] args) {
		PersistenceStrategy strategy  = 
				new FilePersistenceStrategy(new File("d://temp"));
		
		@SuppressWarnings("unchecked")
		List<Author> list = new XmlArrayList(strategy);
		Author author = new Author();
		author.setName("meixi");
		list.add(author);
		list.add(new Author());
	}
}
