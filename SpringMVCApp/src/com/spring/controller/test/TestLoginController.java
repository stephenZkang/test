package com.spring.controller.test;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.model;

import java.util.Properties;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.spring.controller.LoginController;

/**
 * @author qiaok
 * 
 * @see 
 * 		MockMvcBuilders.standaloneSetup		//设置controller对象,
 * 			.setHandlerExceptionResolvers(exceptionResolvers())	//设置异常映射
			.setViewResolvers(viewResolver())	//设置跳转映射
			
		Test方法中使用
			mockMvc.perform(post('helloworld/{id}',1l)) 
				post请求协议,	helloworld/{id}映射路径,1l对应id传输的值
			.andExpect(status().isOk())		
				//期待返回的状态码: 有客户端错误，服务端错误，未发现，ok
            .andExpect(view().name("views/helloworld"))		
            	//映射到helloworld
            .andExpect(model().attribute("message", "Hello World"))
            	//模型中的参数值比对
            .andExpect(forwardedUrl("/WEB-INF/views/helloworld.jsp"));	
            	//期待跳转的页面
 */
@RunWith(MockitoJUnitRunner.class)
public class TestLoginController {
	private MockMvc mockMvc;
	
	@InjectMocks
	private LoginController controller;
	
	@Before
	public void setUp(){
		MockitoAnnotations.initMocks(this);
		/**
		 * 使用standaloneSetup来组装controller
		 */
		this.mockMvc = standaloneSetup(controller)
							.setHandlerExceptionResolvers(exceptionResolvers())
							.setViewResolvers(viewResolver())
							.build();
	}
	



	private HandlerExceptionResolver  exceptionResolvers() {
		SimpleMappingExceptionResolver exceptionResolver = new SimpleMappingExceptionResolver();
		Properties exceptionMappings = new Properties();
		exceptionMappings.put("java.lang.Exception", "error/error");
	    exceptionMappings.put("java.lang.RuntimeException", "error/error");
	 
		exceptionResolver.setExceptionMappings(exceptionMappings);
		
		Properties statusCodes = new Properties();
		statusCodes.put("error/error", "500");
		exceptionResolver.setStatusCodes(statusCodes);
		return exceptionResolver;
	}




	private ViewResolver viewResolver() {
		InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/");
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
		
		this.mockMvc.perform(post("/helloWorld/{id}",2l))
				.andExpect(status().isOk())			//返回ok的话
                .andExpect(view().name("views/helloworld"))		//映射到helloworld
                .andExpect(model().attribute("message", "Hello World"))
                .andExpect(forwardedUrl("/WEB-INF/views/helloworld.jsp"));	//跳转的页面
	}


	/**
	 * @throws Exception
	 * 
	 * @see 测试LoginController中的helloworld方法
	 */
	@Test
	public void thatHelloWorldAfterThisHttpERROR() throws Exception{
		
		this.mockMvc.perform(post("/helloWorld/{id}",1l))
				.andExpect(status().is5xxServerError())			//返回ok的话
                .andExpect(forwardedUrl("/WEB-INF/error/error.jsp"));	//跳转的页面
	}
	
	/**
	 * @throws Exception
	 * 
	 * @see 测试LoginController中的helloworld
	 */
	@Test
	public void thatHelloWorld() throws Exception{
		
		this.mockMvc.perform(post("/helloWorld/{id}",1l))
				.andExpect(status().is5xxServerError())			//返回ok的话
                .andExpect(forwardedUrl("/WEB-INF/error/error.jsp"));	//跳转的页面
	}
}
