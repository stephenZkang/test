package com.stephen.poi.utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 * @author QIAOK
 * @see POI导出的工具集
 * @since 2016-01-19
 */
public class POIUtils {

	/**
	 * 创建标题行
	 * @param workbook	工作薄
	 * @param sheet		工作表
	 * @param cellStyle	自定义样式
	 * @param height	行高
	 * @param row		第row行
	 * @return
	 */
	public static HSSFRow createTitleRow(HSSFWorkbook workbook, 
					HSSFSheet sheet, HSSFCellStyle cellStyle,int height,int row) {
		HSSFRow header = sheet.createRow(row);
		if(cellStyle==null){
			cellStyle = createCellStyle(workbook,16,HSSFColor.BLACK.index,HSSFFont.BOLDWEIGHT_BOLD,
						HSSFCellStyle.ALIGN_CENTER,HSSFCellStyle.VERTICAL_CENTER,HSSFCellStyle.BORDER_THIN,
						HSSFCellStyle.BORDER_THIN,HSSFCellStyle.BORDER_THIN,HSSFCellStyle.BORDER_THIN,
						HSSFColor.WHITE.index,true);
		}
		header.setRowStyle(cellStyle);
		header.setHeightInPoints((short) (height*20));
		return header;
	}
	
	/**
	 * 创建内容行(单行)
	 * @param workbook	工作薄
	 * @param sheet		工作表
	 * @param cellStyle	样式
	 * @param height	行高的倍数
	 * @param row		第几行
	 * @return
	 */
	public static HSSFRow createContentRow(HSSFWorkbook workbook, 
			HSSFSheet sheet, HSSFCellStyle cellStyle,int height,int row) {
		HSSFRow content = sheet.createRow(row);
		if(cellStyle==null){
			cellStyle = createCellStyle(workbook,16,HSSFColor.BLACK.index,HSSFFont.BOLDWEIGHT_NORMAL,
						HSSFCellStyle.ALIGN_CENTER,HSSFCellStyle.VERTICAL_CENTER,HSSFCellStyle.BORDER_THIN,
						HSSFCellStyle.BORDER_THIN,HSSFCellStyle.BORDER_THIN,HSSFCellStyle.BORDER_THIN,
						HSSFColor.WHITE.index,true);
		}
		content.setRowStyle(cellStyle);
		content.setHeightInPoints((short) (height*20));
		return content;
	}

	/**
	 * 创建内容行(多行)
	 * @param workbook		工作薄
	 * @param sheet			工作表
	 * @param cellStyle		样式
	 * @param content		二维list
	 * @param startRow		起始行
	 */
	public static void createContentRows(HSSFWorkbook workbook,
			HSSFSheet sheet, HSSFCellStyle cellStyle,List<List<String>> content,int startRow) {
		if(content!=null&&content.size()>0){
			for (int i = 0; i < content.size(); i++) {
				int r = startRow+i;
				HSSFRow row = sheet.createRow(r);
				if(cellStyle==null){
					cellStyle = createCellStyle(workbook,16,HSSFColor.BLACK.index,HSSFFont.BOLDWEIGHT_NORMAL,
								HSSFCellStyle.ALIGN_CENTER,HSSFCellStyle.VERTICAL_CENTER,HSSFCellStyle.BORDER_THIN,
								HSSFCellStyle.BORDER_THIN,HSSFCellStyle.BORDER_THIN,HSSFCellStyle.BORDER_THIN,
								HSSFColor.WHITE.index,true);
				}
				row.setRowStyle(cellStyle);
				row.setHeightInPoints((short)20);
				List<String> list = content.get(i);
				if(list!=null&&list.size()>0){
					POIUtils.createConentCells(sheet, row, list,cellStyle);
				}
			}
		}
	}
	
	/**
	 * 
	 * @param workbook	工作表
	 * @param fontSize	字体大小
	 * @param fontColor	字体颜色			例：HSSFColor.BLACK.index				黑色
	 * @param bold		是否粗体			例：HSSFFont.BOLDWEIGHT_BOLD			粗体
	 * @param align		水平对齐			例：HSSFCellStyle.ALIGN_CENTER		水平居中
	 * @param valign	垂直对齐			例：HSSFCellStyle.VERTICAL_CENTER		垂直居中
	 * @param tborder	上边框			例：HSSFCellStyle.BORDER_THIN			细边框
	 * @param bborder	下边框			例：HSSFCellStyle.BORDER_THIN			细边框
	 * @param lborder	左边框			例：HSSFCellStyle.BORDER_THIN			细边框
	 * @param rborder	右边框			例：HSSFCellStyle.BORDER_THIN			细边框
	 * @param foregroundColor	前景色	例：HSSFColor.BLACK.index				黑色
	 * @param wrapped	字体是否换行		
	 * @return
	 */
	public static HSSFCellStyle createCellStyle(HSSFWorkbook workbook,
						int fontSize,short fontColor,short bold,short align,short valign,
						short tborder,short bborder,short lborder,short rborder,
						short foregroundColor,boolean wrapped) {
		HSSFCellStyle cellStyle = workbook.createCellStyle();
		//字体
		HSSFFont font = workbook.createFont();
		//字体大小
		font.setFontHeightInPoints((short) fontSize);
		//字体名称
//		font.setFontName("");
		//字体颜色
		font.setColor(fontColor);
		//是否粗体
		font.setBoldweight(bold);
		cellStyle.setFont(font);
		//水平对齐
		cellStyle.setAlignment(align);
		//垂直对齐
		cellStyle.setVerticalAlignment(valign);
		//是否换行
		cellStyle.setWrapText(wrapped);
		//边框
		cellStyle.setBorderBottom(bborder);
		cellStyle.setBorderLeft(lborder);
		cellStyle.setBorderRight(rborder);
		cellStyle.setBorderTop(tborder);
		cellStyle.setFillForegroundColor(foregroundColor);
		cellStyle.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
		return cellStyle;
	}

	/**
	 * 合并单元格
	 * @param sheet		工作表
	 * @param rows		例：int[][] row = new int[][]{{0,0,0,10}}
	 * 						firstRow,lastRow,firstCol,lastCol
	 */
	public static void createCellRange(HSSFSheet sheet, int[][] rows) {
		if(rows!=null&&rows.length>0){
			for (int[] is : rows) {
				CellRangeAddress rangeAddress = new CellRangeAddress(is[0], is[1], is[2], is[3]);
				sheet.addMergedRegion(rangeAddress);
			}
		}
	}

	/**
	 * 创建标题行单元格
	 * @param sheet			工作表
	 * @param header		首行
	 * @param columnIndex	第几列
	 * @param value			列的值
	 * @param cellStyle		列的样式
	 * @param width			列的宽度
	 */
	public static void createTitleCell(HSSFSheet sheet,HSSFRow header,int columnIndex,
					String value,HSSFCellStyle cellStyle,int width) {
		HSSFCell cell = header.createCell(columnIndex,  HSSFCell.CELL_TYPE_STRING);
		cell.setCellValue(value);
		cell.setCellStyle(cellStyle);
		sheet.setColumnWidth(columnIndex, width*256);
	}
	
	
	/**
	 * 创建内容行单元格
	 * @param sheet			工作表
	 * @param content		内容行
	 * @param columnIndex	第几列
	 * @param value			列的值[long]
	 * @param cellStyle		列的样式
	 * @param width			列的宽度
	 */
	public static void createConentCell(HSSFSheet sheet,HSSFRow content,int columnIndex,
			long value,HSSFCellStyle cellStyle,int width) {
		HSSFCell cell = content.createCell(columnIndex,  HSSFCell.CELL_TYPE_NUMERIC);
		cell.setCellValue(value);
		cell.setCellStyle(cellStyle);
		sheet.setColumnWidth(columnIndex, width*256);
	}
	
	/**
	 * 创建内容行单元格
	 * @param sheet			工作表
	 * @param content		内容行
	 * @param columnIndex	第几列
	 * @param value			列的值[boolean]
	 * @param cellStyle		列的样式
	 * @param width			列的宽度
	 */
	public static void createConentCell(HSSFSheet sheet,HSSFRow content,int columnIndex,
			boolean value,HSSFCellStyle cellStyle,int width) {
		HSSFCell cell = content.createCell(columnIndex,  HSSFCell.CELL_TYPE_BOOLEAN);
		cell.setCellValue(value);
		cell.setCellStyle(cellStyle);
		sheet.setColumnWidth(columnIndex, width*256);
	}
	
	/**
	 * 创建内容行单元格
	 * @param sheet			工作表
	 * @param content		内容行
	 * @param columnIndex	第几列
	 * @param value			列的值[String]
	 * @param cellStyle		列的样式
	 */
	public static void createConentCell(HSSFSheet sheet,HSSFRow content,int columnIndex,
			String value,HSSFCellStyle cellStyle) {
		HSSFCell cell = content.createCell(columnIndex,  HSSFCell.CELL_TYPE_STRING);
		cell.setCellValue(value);
		cell.setCellStyle(cellStyle);
	}
	
	/**
	 * 创建内容行单元格，宽度由标题行控制
	 * @param sheet		工作表
	 * @param header	首行row
	 * @param contents	内容名称集合
	 * @param cellStyle	内容样式
	 */
	public static void createConentCells(HSSFSheet sheet, HSSFRow row,
			List<String> contents,HSSFCellStyle cellStyle) {
		if(contents!=null&&contents.size()>0){
		for (int i = 0; i < contents.size(); i++) {
			if(contents.get(i)!=null){
				createConentCell(sheet, row, i, contents.get(i),cellStyle);
			}else{
				createConentCell(sheet, row, i, "",cellStyle);
			}
		}
	}
}


	/**
	 * 
	 * @param sheet		工作表
	 * @param header	首行row
	 * @param headers	标题名称集合
	 * @param widths	标题宽度集合
	 * @param cellStyle	标题样式
	 */
	public static void createTitleCells(HSSFSheet sheet, HSSFRow header,
			String[] headers, int[] widths, HSSFCellStyle cellStyle) {
		if(headers!=null&&widths!=null
					&&headers.length>0&&widths.length>0){
			for (int i = 0; i < headers.length; i++) {
				if(headers[i]!=null){
					createTitleCell(sheet, header, i, headers[i],cellStyle, widths[i]);
				}else{
					createTitleCell(sheet, header, i, "",cellStyle, widths[i]);
				}
			}
		}
	}

	/**
	 * 创建标题行样式
	 * @param workbook	工作薄
	 * @param fontSize	字体大小
	 * @return
	 */
	public static HSSFCellStyle createCellTitleStyle(HSSFWorkbook workbook,
			int fontSize) {
		return createCellStyle(workbook, fontSize, HSSFColor.BLACK.index, HSSFFont.BOLDWEIGHT_BOLD, HSSFCellStyle.ALIGN_CENTER,
						HSSFCellStyle.VERTICAL_CENTER, HSSFCellStyle.BORDER_MEDIUM, HSSFCellStyle.BORDER_MEDIUM, HSSFCellStyle.BORDER_MEDIUM, HSSFCellStyle.BORDER_MEDIUM,
						HSSFColor.GREY_50_PERCENT.index,true);
	}

	/**
	 * 创建内容样式
	 * @param workbook	工作表
	 * @param fontSize	字体大小
	 * @return
	 */
	public static HSSFCellStyle createContentStyle(HSSFWorkbook workbook,
			int fontSize) {
		return createCellStyle(workbook, fontSize, HSSFColor.BLACK.index, HSSFFont.BOLDWEIGHT_NORMAL, HSSFCellStyle.ALIGN_CENTER,
				HSSFCellStyle.VERTICAL_CENTER, HSSFCellStyle.BORDER_MEDIUM, HSSFCellStyle.BORDER_MEDIUM, HSSFCellStyle.BORDER_MEDIUM, HSSFCellStyle.BORDER_MEDIUM,
				HSSFColor.WHITE.index,true);
	}

	/**
	 * 输出excel
	 * @param fileName	文件名
	 * @param workbook	工作薄
	 */
	public static void closeWork(String fileName, HSSFWorkbook workbook) {
		File file = new File(fileName);
		FileOutputStream stream = null;
		try {
			stream = new FileOutputStream(file);
			workbook.write(stream);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(stream!=null){
				try {
					stream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 输出excel
	 * @param stream	输出流
	 * @param workbook	工作薄
	 */
	public static void closeWork(OutputStream stream, HSSFWorkbook workbook) {
		try {
			workbook.write(stream);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			if(stream!=null){
				try {
					stream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	/**
	 * 重命名sheet名称
	 * @param workbook	工作薄
	 * @param sheet		工作表
	 * @param name		sheet名称
	 */
	public static void reSheetName(HSSFWorkbook workbook, HSSFSheet sheet,
		      String name) {
	    int sheetIndex = workbook.getSheetIndex(sheet);
	    workbook.setSheetName(sheetIndex, name);
	}

	/**
	 * 导出excel
	 * @param headers		标题
	 * @param widths		标题对应的宽度
	 * @param content		内容
	 * @param fileName		文件名
	 * @param sheetName		工作表名称
	 * @param pageSize		每页显示的条数	输入0时，默认为10000
	 */
	public static void exportExcel(String[] headers, int[] widths,
			List<List<String>> content, String fileName, String sheetName,int pageSize) {
		if(pageSize==0){
			pageSize = 10000;
		}
		HSSFWorkbook workbook = new HSSFWorkbook();
		if(content!=null&&content.size()>0){
			int totalRow = content.size();
			int page = totalRow/pageSize;
			int n = totalRow%pageSize;
			if(n>0){
				page = page+1;
			}
			for (int i = 0; i < page; i++) {
				//创建sheet 工作薄
				HSSFSheet sheet = workbook.createSheet();
				if(sheetName != null){
					POIUtils.reSheetName(workbook, sheet, i>0?sheetName+"_"+i:sheetName);
				}
				//标题
				HSSFRow header = POIUtils.createTitleRow(workbook,sheet,null,1,0);
				HSSFCellStyle cellStyle = POIUtils.createCellTitleStyle(workbook, 16);
				POIUtils.createTitleCells(sheet,header,headers, widths,cellStyle);
				List<List<String>> subCon = null;
				int size = content.size();
				if(page>1){
					if(size>pageSize*(i+1)){
						subCon = content.subList(pageSize*i,pageSize*(i+1));
					}else{
						subCon = content.subList(pageSize*i,size);
					}
				}else{
					subCon = content;
				}
				
				//内容
				cellStyle =  POIUtils.createContentStyle(workbook,14);
				POIUtils.createContentRows(workbook, sheet, null,subCon,1);
			}
			POIUtils.closeWork(fileName,workbook);
		}
	}
	
	/**
	 * 导出excel
	 * @param headers		标题
	 * @param widths		标题对应的宽度
	 * @param content		内容
	 * @param stream		输出流
	 * @param sheetName		工作表名称
	 * @param pageSize		每页显示的条数
	 */
	public static void exportExcel(String[] headers, int[] widths,
			List<List<String>> content, OutputStream stream, String sheetName,int pageSize) {
		if(pageSize==0){
			pageSize = 10000;
		}
		HSSFWorkbook workbook = new HSSFWorkbook();
		if(content!=null&&content.size()>0){
			int totalRow = content.size();
			int page = totalRow/pageSize;
			int n = totalRow%pageSize;
			if(n>0){
				page = page+1;
			}
			for (int i = 0; i < page; i++) {
				//创建sheet 工作薄
				HSSFSheet sheet = workbook.createSheet();
				if(sheetName != null){
					POIUtils.reSheetName(workbook, sheet, i>0?sheetName+"_"+i:sheetName);
				}
				//标题
				HSSFRow header = POIUtils.createTitleRow(workbook,sheet,null,1,0);
				HSSFCellStyle cellStyle = POIUtils.createCellTitleStyle(workbook, 16);
				POIUtils.createTitleCells(sheet,header,headers, widths,cellStyle);
				List<List<String>> subCon = null;
				int size = content.size();
				if(page>1){
					if(size>pageSize*(i+1)){
						subCon = content.subList(pageSize*i,pageSize*(i+1));
					}else{
						subCon = content.subList(pageSize*i,size);
					}
				}else{
					subCon = content;
				}
				
				//内容
				cellStyle =  POIUtils.createContentStyle(workbook,14);
				POIUtils.createContentRows(workbook, sheet, null,subCon,1);
			}
			POIUtils.closeWork(stream,workbook);
		}
	}

	
}
