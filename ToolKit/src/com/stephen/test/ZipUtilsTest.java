package com.stephen.test;

import java.io.File;

import org.junit.Test;

import com.stephen.utils.ZipUtils;

/**
 * @author QIAOK
 * @see 测试ant解压和压缩文件夹的工具集
 * @since 2016-01-29
 */
public class ZipUtilsTest {
	
	/**
	 * 测试压缩文件夹
	 * @throws Exception
	 */
	@Test
	public void zip() throws Exception{
		//存放目录
		String destDir = "dest";
		//要压缩的文件
		String inputPath = "font";
		ZipUtils.zip(destDir, inputPath);
	}
	
	/**
	 * 测试压缩文件夹
	 * @throws Exception
	 */
	@Test
	public void unZip() throws Exception{
		//存放目录
		String destFilePath = "dest"+File.separator+"font"+File.separator;
		//要压缩的文件
		String fileName = "dest"+File.separator+"font.zip";
		ZipUtils.unZip(fileName, destFilePath);
	}

}
