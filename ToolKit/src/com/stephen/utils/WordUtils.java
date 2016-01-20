package com.stephen.utils;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.RenderingHints;
import java.awt.Stroke;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtilities;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.StandardChartTheme;
import org.jfree.chart.axis.CategoryAxis;
import org.jfree.chart.axis.NumberAxis;
import org.jfree.chart.plot.CategoryPlot;
import org.jfree.chart.plot.DefaultDrawingSupplier;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.category.CategoryDataset;
import org.jfree.data.category.DefaultCategoryDataset;

import com.lowagie.text.BadElementException;
import com.lowagie.text.Cell;
import com.lowagie.text.Chunk;
import com.lowagie.text.Document;
import com.lowagie.text.DocumentException;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.Image;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.Rectangle;
import com.lowagie.text.Table;
import com.lowagie.text.rtf.RtfWriter2;


/**
 * @author QIAOK
 * @see 测试IText导出Word的工具集
 * @since 2016-01-20
 */
public class WordUtils {

	/**
	 * 设置首页页面属性
	 * @param document	文档
	 * @param title		标题
	 * @param author	作者
	 * @param pageSize	页面大小	PageSize.A4
	 * 			Rectangle rotate = pageSize.rotate();	页面横向
				document.setPageSize(rotate);
	 */
	public static void setDefaultDocSetting(Document document, String title, String author,
					Rectangle pageSize) {
		setDocSetting(document,title,author,"",pageSize,72,72,72,72);
	}
	
	/**
	 * 设置页面属性
	 * @param document	文档
	 * @param title		标题
	 * @param author	作者
	 * @param subject	主题
	 * @param pageSize	页面大小	PageSize.A4
	 * 			Rectangle rotate = pageSize.rotate();	页面横向
				document.setPageSize(rotate);
	 * @param top		上页边距
	 * @param right		右页边距
	 * @param bottom	下页边距
	 * @param left		左页边距
	 */
	public static void setDocSetting(Document document, String title,
			String author, String subject, Rectangle pageSize, int top, int right , int bottom,
			int left) {
		document.setMargins(top,right, bottom, left);
		if(title!=null){
			document.addTitle(title);
		}
		if(author!=null){
			document.addAuthor(author);
		}
		if(subject!=null){
			document.addSubject(subject);
		}
		if(pageSize!=null){
			document.setPageSize(pageSize);
		}
	}
	
	/**
	 * 设置段落
	 * @param font		段落的字体
	 * @param content	段落的内容
	 * @param indent	段落首行间距
	 * @param lead		段落间距
	 * @param pos		段落的对齐方式	Paragraph.ALIGN_CENTER
	 * @return
	 */
	public static Paragraph createParagraph(Font font,
							String content,int lead,int indent,int pos) {
	    Paragraph paragraph = new Paragraph(content,font);
	    //设置对齐方式
	    paragraph.setAlignment(pos);
	    paragraph.setLeading(lead);
	    //设置首行间距
	    paragraph.setFirstLineIndent(indent);
	    return paragraph;
	}
	
	/**
	 * 设置标题段落
	 * @param document 
	 * @param content	段落的内容
	 * @param lead		段落间距
	 * @param size		字体大小
	 * @return
	 * @throws DocumentException 
	 */
	public static Paragraph createTitleParagraph(
			Document document, String content,int lead,int size) throws DocumentException {
		Font font = WordUtils.createFont(Color.BLACK,size,"宋体",Font.BOLD);
		Paragraph paragraph = new Paragraph(content,font);
		//设置对齐方式
		paragraph.setAlignment(Paragraph.ALIGN_CENTER);
		paragraph.setLeading(lead);
		document.add(paragraph);
		return paragraph;
	}
	
	
	/**
	 * 设置内容段落
	 * @param document 
	 * @param content	段落的内容
	 * @param indent	段落首行间距
	 * @param lead		段落间距
	 * @return
	 * @throws DocumentException 
	 */
	public static Paragraph createContentParagraph(
			Document document, String content,int lead,int indent) throws DocumentException {
		Font font = WordUtils.createFont(Color.BLACK,12,"宋体",Font.NORMAL);
		Paragraph paragraph = new Paragraph(content,font);
		//设置对齐方式
		paragraph.setAlignment(Paragraph.ALIGN_LEFT);
		paragraph.setLeading(lead);
		//设置首行间距
		paragraph.setFirstLineIndent(indent);
		document.add(paragraph);
		return paragraph;
	}
	
	/**
	 * 创建字体
	 * @param color		字体颜色
	 * @param size		字体大小
	 * @param family	字体
	 * @param bold		是否粗体
	 * @return
	 */
	public static Font createFont(Color color, int size, String family,int bold) {
		Font font = new Font(Font.NORMAL,size,bold,color);
		if(color!=null){
			font.setColor(color);
		}
		if(family!=null){
			font.setFamily(family);
		}
		return font;
	}
	

	/**
	 * 设置文档名称
	 * @param document	文档
	 * @param fileName	文档名称
	 * @return FileOutputStream
	 */
	public static FileOutputStream setFileName(Document document, String fileName) {
		File file = new File(fileName);
		FileOutputStream stream = null;
		try {
			stream = new FileOutputStream(file);
			RtfWriter2.getInstance(document, stream);
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return stream;
	}
	
	/**
	 * 关闭文档
	 * @param document
	 * @param stream
	 */
	public static void closeDocument(Document document, FileOutputStream stream) {
		if(document!=null){
			document.close();
		}
		if(stream!=null){
			try {
				stream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
	}
	
	/**
	 * 数据集
	 * @param datas
	 * @param title
	 * @return
	 */
	public static CategoryDataset  getData(int[] datas,String title) {
	    DefaultCategoryDataset dataset = new DefaultCategoryDataset(); 
	    // 构造数据集合
	    for (int i = 0; i < datas.length; i++) {
	    	dataset.addValue(datas[i], title, title+i); 
    	}
    	return dataset;
	}
	
	/**
	 * 创建图标
	 * @param document
	 * @param datas			数据
	 * @param title			标题
	 * @param xSerie		x轴标题
	 * @param yserie		y轴标题
	 * @param lpos			位置left
	 * @param tpos			位置top
	 */
	public static void createPicByJfreeChart(Document document, 
									int[] datas,String title,String xSerie,
									String yserie,int lpos,int tpos) {
	   CategoryDataset  dataset = getData(datas,xSerie);
	   StandardChartTheme chartTheme = new StandardChartTheme("CN");
	   Color[] CHART_COLORS = {Color.BLUE};
	   Stroke[] CHART_STROKE = {new BasicStroke(8f)};
	   DefaultDrawingSupplier drawingSupplier = new DefaultDrawingSupplier(CHART_COLORS, CHART_COLORS, CHART_COLORS,
	       CHART_STROKE, DefaultDrawingSupplier.DEFAULT_OUTLINE_STROKE_SEQUENCE,
	       DefaultDrawingSupplier.DEFAULT_SHAPE_SEQUENCE);
	   chartTheme.setDrawingSupplier(drawingSupplier);
	   ChartFactory.setChartTheme(chartTheme);
	   
	   JFreeChart chart = ChartFactory.createLineChart(title, // 标题
			   							xSerie, // 目录轴（水平）
			   							yserie, // 数值轴（垂直）
	                                     dataset, // 数据集
	                                     PlotOrientation.VERTICAL,
	                                     true, // 是否显示图例（对于简单的柱状图是必须的）
	                                     false, // 是否生成工具
	                                     false // 是否生成 url 链接
	                                     );
	   // 设置Title的字体(有些版本会出现乱码)
	   chart.getTitle().setFont((new java.awt.Font("宋体", java.awt.Font.BOLD, 48)));
	   chart.getLegend().setItemFont(new java.awt.Font("宋体", Font.BOLD, 44));
	   chart.getRenderingHints().put(RenderingHints.KEY_TEXT_ANTIALIASING,
	   RenderingHints.VALUE_TEXT_ANTIALIAS_OFF);
	   CategoryPlot plot = chart.getCategoryPlot();
	   plot.setBackgroundPaint(Color.white);
	   java.awt.Font font = new java.awt.Font("宋体", java.awt.Font.BOLD, 44);
	   CategoryAxis categoryAxis = plot.getDomainAxis();
	   categoryAxis.setTickLabelFont(font);
	   categoryAxis.setLabelFont(font);
	   NumberAxis numberaxis = (NumberAxis) plot.getRangeAxis();
	   numberaxis.setTickLabelFont(font);
	   numberaxis.setLabelFont(font);
	   String templPath = "d:";
	   try {
		   File temp = new File(templPath+File.separator+"tmp.jpg");
		   FileOutputStream fos_jpg = new FileOutputStream(temp); // 图片的输出目录
		   ChartUtilities.writeChartAsJPEG(fos_jpg, 1, chart, 1500, 1200, null);
		   createPicture(document,Image.MIDDLE, lpos, tpos, templPath+File.separator+"tmp.jpg");
		   if(temp.exists()){
			   temp.delete();
		   }
		} catch (Exception e) {
			e.printStackTrace();
		}
	 }

	/**
	 * word中插入图片
	 * @param document
	 * @param align						图片对齐方式	Image.LEFT
	 * @param lpos						图片的位置left
	 * @param tpos						图片的位置top
	 * @param filePath					图片的路径
	 * @throws BadElementException
	 * @throws MalformedURLException
	 * @throws IOException
	 * @throws DocumentException
	 */
	public static void createPicture(Document document,int align, int lpos, int tpos,
			String filePath) throws BadElementException,
			MalformedURLException, IOException, DocumentException {
	   Image img=Image.getInstance(filePath);
	   img.setAbsolutePosition(lpos, tpos);
	   img.setAlignment(align);//设置图片显示位置
	   img.scaleAbsolute(20,35);//直接设定显示尺寸
	   img.scalePercent(100);//表示显示的大小为原尺寸的50%
	   img.scalePercent(25, 20);//图像高宽的显示比例
	   img.setRotation(30);//图像旋转一定角度
	   Chunk ck = new Chunk(img, 0, -5);
	   Phrase p1 = new Phrase();
	   p1.add(ck);
	   document.add(p1);
	}

	/**
	 * 创建空白行
	 * @param n
	 * @throws DocumentException 
	 */
	public static void createSpaceParagraph(Document document,int n) throws DocumentException {
	    for (int i = 0; i < n; i++) {
	        Paragraph p = new Paragraph("",new Font(Font.NORMAL,32,Font.BOLD,new Color(0,0,0)));
	        document.add(p);
	      }
    }

	/**
	 * 创建表格	
	 * @param document
	 * @param headers	标题	
	 * @param content	内容
	 * @throws Exception 
	 */
	public static void createTable(Document document, String[] headers,
			List<List<String>> content,int[] widths) throws Exception {
		int len = headers.length;
	    Table table = new Table(len);
	    //设置显示表格百分比
	    table.setWidth(100);
	    //设置单元格百分比
	    if(widths!=null){
	    	table.setWidths(widths);
	    }
	    table.setAlignment(Element.ALIGN_CENTER);//居中显示
	    table.setAlignment(Element.ALIGN_MIDDLE);//纵向居中显示
	    table.setBorderWidth(1); //边框宽度
	    table.setBorderColor(Color.BLACK); //边框颜色
	    table.setPadding(0);//衬距，看效果就知道什么意思了
	    table.setSpacing(0);//即单元格之间的间距
	    table.setBorder(2);//边框
	    
	    //设置表头
	    Font font = new Font(Font.NORMAL, 14, Font.BOLD, Color.BLACK);
	    for (String header : headers) {
	    	setTableHeader(table,header,font,1,1);
		}
	    table.endHeaders();
	    
	    Font fontChinese = new Font(Font.NORMAL, 14, Font.NORMAL, Color.BLACK);
	    if(content!=null&& content.size()>0){
	      for (List<String> list : content) {
	    	for (String con : list) {
	    		if(con!=null){
	    			setTableCell(table,con,fontChinese,1,1);
	    		}else{
	    			setTableCell(table,"",fontChinese,1,1);
	    		}
			}
	      }
	    }
	    document.add(table);
	  
		
	}
	
	 /**
	   * 设置表头
	   * @param table
	   * @param content		标题内容
	   * @param font		字体
	   * @param col			占几列
	   * @param row			占几行
	   * @throws BadElementException
	   */
	  public static void setTableHeader(Table table,String content, Font font,int col,int row) throws BadElementException {
	    Cell cell = new Cell(new Phrase(content,font));
	    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	    cell.setHeader(true);
	    cell.setColspan(col);
	    cell.setRowspan(row);
	    table.addCell(cell);
	  }

	  /**
	   * 设置表格内容
	   * @param table
	   * @param content
	   * @param font
	   * @param row
	   * @param col
	   * @throws BadElementException
	   */
	  public static void setTableCell(Table table,String content,Font font,int row,int col) throws BadElementException {
	    Cell cell = new Cell(new Phrase(content!=null?content:"", font ));
	    cell.setVerticalAlignment(Element.ALIGN_CENTER);
	    cell.setHorizontalAlignment(Element.ALIGN_CENTER);
	    cell.setBorderColor(Color.BLACK);
	    cell.setRowspan(row);
	    cell.setColspan(col);
	    table.addCell(cell);
	  }
}
