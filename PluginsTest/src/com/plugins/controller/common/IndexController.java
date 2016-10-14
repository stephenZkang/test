package com.plugins.controller.common;

import com.jfinal.core.Controller;

public class IndexController extends Controller{
	
	public void index(){
		redirect("/layout/main.html");
	}
	
}
