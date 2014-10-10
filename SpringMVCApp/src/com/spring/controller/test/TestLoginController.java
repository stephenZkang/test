package com.spring.controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.spring.controller.LoginController;

@RunWith(MockitoJUnitRunner.class)
public class TestLoginController {
	private MockMvc mockMvc;
	
	@InjectMocks
	private LoginController controller;
	
	@Before
	public void setUp(){
		MockitoAnnotations.initMocks(this);
		/**
		 * 使用standaloneSetup来安装controller
		 */
		this.mockMvc = standaloneSetup(controller)
							.setViewResolvers(viewResolver())
							.build();
	}
	
	private ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/views/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
	}
	
	/**
	 * @throws Exception
	 * 
	 * @see 测试LoginController中的helloworld方法
	 */
	@Test
	public void thatHelloWorldAfterThisHttpOK() throws Exception{
		
		this.mockMvc.perform(post("/helloWorld"))
				.andExpect(status().isOk())			//返回ok的话
                .andExpect(view().name("helloworld"))		//映射到helloworld
                .andExpect(forwardedUrl("/WEB-INF/views/helloworld.jsp"));	//跳转的页面
	}

	
}
