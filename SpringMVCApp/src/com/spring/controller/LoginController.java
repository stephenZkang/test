package com.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {
	
	@RequestMapping("/helloWorld/{id}")
	public String helloWorld(@PathVariable("id")Long id,Model model){
		if(id == 1l){
			throw new RuntimeException();
		}else{
			model.addAttribute("message", "Hello World!");
		}
		return "views/helloworld";
	}
}
