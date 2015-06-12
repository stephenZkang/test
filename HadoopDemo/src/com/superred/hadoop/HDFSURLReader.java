package com.superred.hadoop;

import java.io.InputStream;
import java.net.URL;

import org.apache.hadoop.fs.FsUrlStreamHandlerFactory;
import org.apache.hadoop.io.IOUtils;

/**
 * 读取HADOOP平台HDFS文件系统中的文本。
 * @author QIAOK
 */
public class HDFSURLReader {
	static{
		URL.setURLStreamHandlerFactory(new FsUrlStreamHandlerFactory());
	}
	
	public static void main(String[] args) {
		InputStream inputStream =  null;
		try {
			inputStream = new URL("hdfs://192.168.93.33:9000/usr/hadoop/input/test.txt").openStream();
			IOUtils.copyBytes(inputStream, System.out, 1024,false);
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			IOUtils.closeStream(inputStream);
		}
	}
}
