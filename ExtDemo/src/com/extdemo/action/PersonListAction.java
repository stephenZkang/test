package com.extdemo.action;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;

import com.extdemo.model.Person;
import com.opensymphony.xwork2.ActionSupport;

public class PersonListAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	private int page;
	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	private String jsonString;
	
	public String getJsonString() {
		return jsonString;
	}

	public void setJsonString(String jsonString) {
		this.jsonString = jsonString;
	}

	public String list() throws Exception{
		List<Person> list = new ArrayList<Person>();
		
		Person p1 = new Person();
		p1.setId(1);p1.setName("周星驰");p1.setAge(45);p1.setEmail("xingye@gmail.com");
		Person p2 = new Person();
		p2.setId(2);p2.setName("周润发");p2.setAge(57);p2.setEmail("fage@gmail.com");
		Person p3 = new Person();
		p3.setId(3);p3.setName("刘德华");p3.setAge(55);p3.setEmail("huazai@gmail.com");
		Person p4 = new Person();
		p4.setId(4);p4.setName("张国荣");p4.setAge(57);p4.setEmail("guorong@gmail.com");
		if(this.page == 1){
			list.add(p1);
			list.add(p2);
		}else{
			list.add(p3);
			list.add(p4);
		}
		this.setJsonString("{list:"+JSONArray.fromObject(list).toString()+",page:"+this.page+",totalCount:4}");
		return "json";
	}

}
