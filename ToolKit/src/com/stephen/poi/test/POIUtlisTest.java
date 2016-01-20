package com.stephen.poi.test;

import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.junit.Test;

import com.stephen.poi.utils.POIUtils;


/**
 * @author QIAOK
 * @see 测试POI导出的工具集
 * @since 2016-01-19
 */
public class POIUtlisTest {
	
	/**
	 * 测试POI导出
	 */
	@Test
	public void export(){
		HSSFWorkbook workbook = new HSSFWorkbook();
		//创建sheet 工作薄
		HSSFSheet sheet = workbook.createSheet();
		POIUtils.reSheetName(workbook, sheet, "季度报表");
		/**
		 * 创建标题
		 */
		HSSFRow header = POIUtils.createTitleRow(workbook,sheet,null,1,1);
		
		//合并单元格
//		int[][] rows = new int[][]{{0,0,0,10}}; 
//		POIUtils.createCellRange(sheet,rows);
		
		HSSFCellStyle cellStyle = POIUtils.createCellTitleStyle(workbook, 16);
		String[] headers = {"序号","姓名","性别"};
		int[] widths = {15,15,15};
		POIUtils.createTitleCells(sheet,header,headers, widths,cellStyle);
		
		/**
		 * 设置内容
		 */
		cellStyle =  POIUtils.createContentStyle(workbook,14);
		//单行
		HSSFRow row = POIUtils.createContentRow(workbook, sheet, null, 1, 2);
		List<String>  cons = new ArrayList<String>();
		cons.add("abc");cons.add("abc");cons.add("abc");
		POIUtils.createConentCells(sheet, row, cons,cellStyle);
		//多行
		List<List<String>> content = new ArrayList<List<String>>();
		content.add(cons);content.add(cons);content.add(cons);content.add(cons);
		POIUtils.createContentRows(workbook, sheet, null,content,3);
		
		/**
		 * 输出文档
		 */
		POIUtils.closeWork("d://demo.xls",workbook);
		
	}
	
	
	/**
	 * 测试POI导出
	 */
	@Test
	public void exportExcel(){
		/**
		 * 准备数据
		 */
		String[] headers = {"序号","姓名","性别"};
		int[] widths = {15,15,15};
		List<String>  cons = new ArrayList<String>();
		cons.add("abc");cons.add("abc");cons.add("abc");
		List<List<String>> content = new ArrayList<List<String>>();
		content.add(cons);content.add(cons);content.add(cons);
		String sheetName = "季度报表";
		String fileName = "d://demo1.xls";
		POIUtils.exportExcel(headers, widths, content, fileName, sheetName,2);
		
	}
}
