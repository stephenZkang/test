package com.xstream.model;

import com.thoughtworks.xstream.annotations.XStreamAlias;

@XStreamAlias("School")
public class School {
	private String s_name;

	public String getS_name() {
		return s_name;
	}

	public void setS_name(String s_name) {
		this.s_name = s_name;
	}
	
}
