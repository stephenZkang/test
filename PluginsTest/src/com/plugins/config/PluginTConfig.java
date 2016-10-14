package com.plugins.config;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;
import com.plugins.controller.common.IndexController;
import com.plugins.model.common._MappingKit;

/**
 * 
 * TODO
 * @author QIAOK
 * @see 2016-10-14
 */
public class PluginTConfig extends JFinalConfig{
	
	/**
	 * 配置常量
	 */
	@Override
	public void configConstant(Constants me) {
		PropKit.use("config.txt");				// 加载少量必要配置，随后可用PropKit.get(...)获取值
		//设置开发模式
		me.setDevMode(PropKit.getBoolean("devMode", false));
		me.setViewType(ViewType.JSP); 							// 设置视图类型为Jsp，否则默认为FreeMarker
	}
	/**
	 * 配置路由
	 */
	@Override
	public void configRoute(Routes me) {
	  //系统主页
		me.add("/", IndexController.class);
		
	}
	
	public static C3p0Plugin createC3p0Plugin() {
    return new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password").trim());
  }
	
	
	
	@Override
  public void afterJFinalStart() {
    super.afterJFinalStart();
  }
  /**
	 * 配置插件
	 */
	@Override
	public void configPlugin(Plugins me) {
	// 配置C3p0数据库连接池插件
			C3p0Plugin c3p0Plugin =createC3p0Plugin();
			me.add(c3p0Plugin);
			
			// 配置ActiveRecord插件
			ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
			me.add(arp);
			
			// 所有配置在 MappingKit 中搞定
	    _MappingKit.mapping(arp);
	    
		}
	/**
	 * 配置全局拦截器
	 */
	@Override
	public void configInterceptor(Interceptors me) {
	  
	}
	/**
	 * 配置处理器
	 */
	@Override
	public void configHandler(Handlers me) {
		
		
	}
	/**
	 * 建议使用 JFinal 手册推荐的方式启动项目
	 * 运行此 main 方法可以启动项目，此main方法可以放置在任意的Class类定义中，不一定要放于此
	 */
	public static void main(String[] args) {
		JFinal.start("WebContent", 82, "/", 5);
	}
}
