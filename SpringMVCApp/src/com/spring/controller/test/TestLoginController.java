package com.spring.controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.spring.controller.LoginController;

@RunWith(MockitoJUnitRunner.class)
public class TestLoginController {
	private MockMvc mockMvc;
	
	@InjectMocks
	private LoginController controller;
	
	@Before
	public void setUp(){
		MockitoAnnotations.initMocks(this);
		this.mockMvc = standaloneSetup(controller).build();
	}
	
	@Test
	public void thatHelloWorldAfterThisHttpOK() throws Exception{
		
		this.mockMvc.perform(post("helloworld")
				.contentType(MediaType.APPLICATION_XHTML_XML))
				.andDo(print())
				.andExpect(status().isOk());
	}

	
}
