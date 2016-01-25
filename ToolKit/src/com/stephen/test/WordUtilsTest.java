package com.stephen.test;

import java.awt.Color;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.lowagie.text.Document;
import com.lowagie.text.Font;
import com.lowagie.text.PageSize;
import com.lowagie.text.pdf.BaseFont;
import com.lowagie.text.rtf.headerfooter.RtfHeaderFooter;
import com.stephen.utils.WordUtils;

/**
 * @author QIAOK
 * @see 测试IText导出Word的工具集
 * @since 2016-01-20
 */
public class WordUtilsTest {
	
	@Test
	public void export() throws Exception{
		Document document = new Document();
		FileOutputStream stream = WordUtils.setFileName(document, "d://jack.doc");
		document.open();
		WordUtils.setDefaultDocSetting(document,"","",PageSize.A4);
		StringBuffer buffer = new StringBuffer();
		buffer.append("HadoopDemo Ubuntu 12.04 上搭建Hadoop 1.2.1做Hadoop的一些功能测试")
			.append("参考书为：《Hadoop应用开发技术详解》 刘刚 著")
			.append("Redis_demo是对缓存服务器redis的简单操作")
			.append("XstreamDemo是基于Xstream的Java对象和xml之间的转换。")
			.append("ToolKit是日常工作中工具集的积累。")
			.append("如：基于POI的excel导出")
			.append("Mina是基础Mina的服务器框架研究");

		/**
		 * 插入文本
		 */
		//仿宋_GB_2312
		BaseFont bfChinese = BaseFont.createFont("font"+File.separator+"仿宋_GB2312.ttf",
			      BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
		Font cfont = WordUtils.createFont(Color.BLACK,20,bfChinese,Font.NORMAL);
		WordUtils.createContentParagraph(document,buffer.toString(),30,20,cfont);
		WordUtils.createSpaceParagraph(document,4);
		
		/**
		 * 插入图片
		 */
		Font font = WordUtils.createFont(Color.BLACK,20,"宋体",Font.BOLD);
		WordUtils.createTitleParagraph(document, "火箭年龄趋势图", 20, font);
		int[] datas = {10,15,25,55};
		WordUtils.createPicByJfreeChart(document, datas, "年龄趋势图", "人员", "年龄", 0, 0);
		WordUtils.createPicByJfreeChart(document, datas, "年龄趋势图", "人员", "年龄", 0, 0);
		WordUtils.createSpaceParagraph(document,4);

		/**
		 * 插入表格
		 */
		WordUtils.createTitleParagraph(document, "火箭首发人员名单", 20, font);
		String[] headers = new String[]{"序号","姓名","性别"}; 
		List<String> con = new ArrayList<String>();
		con.add("1");con.add("Jack");con.add("男");
		List<List<String>>	content = new ArrayList<List<String>>();
		content.add(con);content.add(con);content.add(con);content.add(con);
		int[] widths = new int[]{1,2,2};
		WordUtils.createTable(document,headers,content,widths);
		
		RtfHeaderFooter footer = WordUtils.createFooter("-",null);
		document.setFooter(footer);
		
		WordUtils.closeDocument(document,stream);
	}

}
