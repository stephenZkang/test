package com.superred.hadoop;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;

/**
 * FileSystem读取Hadoop平台的内容
 * @author QIAOK
 */
public class FileSystemReader {
	public static void main(String[] args) throws IOException{
		//Configuration
		Configuration conf = new Configuration();
		//HADOOP平台地址: HDFS://192.168.93.33:9000
		FileSystem fs = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"), conf);
		//文件存储在HADOOP中的路径
		Path path = new Path("/usr/hadoop/input/test.txt");
		InputStream inputStream = null;
		try {
			inputStream = fs.open(path);
			IOUtils.copyBytes(inputStream, System.out, conf);
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			IOUtils.closeStream(inputStream);
		}
		
	}
}
