package org.stephen.xml;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.dom4j.DocumentHelper;

/**
 * XML�ļ�������UTF-8��BOM��ʽ����
 * 	�������쳣��Content is not allowed in prolog
 * @author qiao123
 *
 */
public class Dom4jTest {
	
	public static void main(String[] args) {
		try {
			String content = FileUtils.readFileToString(new File("d://�����־����.xml"),"utf-8");
			DocumentHelper.parseText(content);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
}
