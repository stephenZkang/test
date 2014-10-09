package com.spring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoginController {
	
	@RequestMapping("/helloWorld")
	public String helloWorld(Model model){
		model.addAttribute("message", "Hello World");
		return "helloworld";
	}
}
