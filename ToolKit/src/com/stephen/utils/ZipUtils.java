package com.stephen.utils;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Enumeration;

import org.apache.tools.zip.ZipEntry;
import org.apache.tools.zip.ZipFile;
import org.apache.tools.zip.ZipOutputStream;

/**
 * @author QIAOK
 * @see 使用ant包解压和压缩文件夹成zip格式
 * @since 2016-01-29
 */
public class ZipUtils {
	
	private static int BUFFER = 1024;

	/**
	 * 将文件夹inputPath压缩到destDirPath中
	 * @param destDirPath		目标目录
	 * @param inputPath			压缩文件夹
	 * @throws Exception
	 */
	public static void zip(String destDirPath,String inputPath) 
			throws Exception{
		
		File inputFile = new File(inputPath);
		
		File destDir = new File(destDirPath);
		if(!destDir.exists()){
			destDir.mkdir();
		}
		
		File destFile = new File(destDirPath+File.separator+inputFile.getName()+".zip");
		
		//递归压缩方法
		ZipOutputStream zipOutputStream = new ZipOutputStream(
					new FileOutputStream(destFile));
		
		//设置压缩编码，设置为GBK在windows下不会出现乱码，如果是Linux或者Unix就不需要了
		zipOutputStream.setEncoding("GBK");
		zip(zipOutputStream,inputFile,"");
		
		zipOutputStream.close();
	}

	private static void zip(ZipOutputStream zipOutputStream, File f,
			String base) throws IOException {
		if(f.isDirectory()){
			File[] listFiles = f.listFiles();
			if(base.length() > 0){
				zipOutputStream.putNextEntry(new ZipEntry(base+File.separator));
			}
			base = base.length() == 0 ? "" : base+File.separator;
			if(listFiles.length>0){
				for (int i = 0; i < listFiles.length; i++) {
					zip(zipOutputStream, listFiles[i], base+listFiles[i].getName());
				}
			}
		}else{
			 // 如果是文件，则压缩
			zipOutputStream.putNextEntry(new ZipEntry(base)); // 生成下一个压缩节点
            FileInputStream in = new FileInputStream(f); // 读取文件内容
            int len;
            byte[] buf = new byte[BUFFER ];
            while ((len = in.read(buf, 0, BUFFER)) != -1) {
            	zipOutputStream.write(buf, 0, len); // 写入到压缩包
            }
            in.close();
            zipOutputStream.closeEntry();
		}
	}
	
	/**
	 * 将压缩文件解压到destFilePath目录
	 * @param fileName			压缩文件
	 * @param destFilePath		目标目录
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	public static void unZip(String fileName, String destFilePath) 
				throws Exception{
        ZipFile zipFile = new ZipFile(fileName, "GBK"); // 以“GBK”编码创建zip文件，用来处理winRAR压缩的文件。
        Enumeration emu = zipFile.getEntries();
        while (emu.hasMoreElements()) {
            ZipEntry entry = (ZipEntry) emu.nextElement();
            if (entry.isDirectory()) {
                File dir = new File(destFilePath + entry.getName());
                if (!dir.exists()) {
                    dir.mkdirs();
                }
                continue;
            }
            BufferedInputStream bis = new BufferedInputStream(zipFile
                    .getInputStream(entry));
 
            File file = new File(destFilePath + entry.getName());
            File parent = file.getParentFile();
            if (parent != null && (!parent.exists())) {
                parent.mkdirs();
            }
            FileOutputStream fos = new FileOutputStream(file);
            BufferedOutputStream bos = new BufferedOutputStream(fos, BUFFER);
            byte[] buf = new byte[BUFFER];
            int len = 0;
            while ((len = bis.read(buf, 0, BUFFER)) != -1) {
                fos.write(buf, 0, len);
            }
            bos.flush();
            bos.close();
            bis.close();
        }
        zipFile.close();
    }
}
