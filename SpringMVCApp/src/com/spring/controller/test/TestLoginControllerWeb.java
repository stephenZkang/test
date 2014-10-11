package com.spring.controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

/**
 * @author qiaok
 * 
 * 
 *
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"file:///d:/software/tomcat-6_ext/webapps/SpringMVCApp/WEB-INF/SpringMVCApp-servlet.xml"})
@WebAppConfiguration
public class TestLoginControllerWeb {
	
	private MockMvc mockMvc;
	@Autowired
    private WebApplicationContext webApplicationContext;
 
    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }
	
	@Test
	public void testHelloWorld() throws Exception{
		mockMvc.perform(post("/helloWorld/{id}",2l))
					.andExpect(status().isOk())
					.andExpect(view().name("views/helloworld"))
					.andExpect(model().attribute("message", "Hello World!"))
					.andExpect(forwardedUrl("/WEB-INF/views/helloworld.jsp"));
	}
	
	
}
