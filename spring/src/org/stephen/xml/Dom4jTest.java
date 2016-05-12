package org.stephen.xml;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.dom4j.DocumentHelper;

/**
 * XML文件必须以UTF-8无BOM格式编码
 * 	否则抛异常：Content is not allowed in prolog
 * @author qiao123
 *
 */
public class Dom4jTest {
	
	public static void main(String[] args) {
		try {
			String content = FileUtils.readFileToString(new File("d://审计日志导出.xml"),"utf-8");
			DocumentHelper.parseText(content);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
}
