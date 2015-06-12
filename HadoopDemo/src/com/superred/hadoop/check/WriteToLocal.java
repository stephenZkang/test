package com.superred.hadoop.check;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.LocalFileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.RawLocalFileSystem;

/**
 * HDFS数据的完整性，提供了两种数据校验方式
 * 	1、数据块检测
 *  2、校验和
 *  
 *  校验和在第一次启动Hadoop时，计算数据的校验和，在通道传输过程中，
 *  如果新生成的校验与原始的不完全匹配，那么数据被认为损坏
 * @author qiao123
 */
public class WriteToLocal {
	
	public static void main(String[] args) throws IOException {
		Configuration conf = new Configuration();
		LocalFileSystem fs = new LocalFileSystem(new RawLocalFileSystem());
		fs.initialize(URI.create("file:///home/ubuntu/file.txt"), conf);
		Path path = new Path("file:///home/ubuntu/file.txt");
		OutputStream out = fs.create(path);
		for (int i = 0; i < 512*10; i++) {
			out.write(97);
		}
		
		out.close();
		Path file = fs.getChecksumFile(path);
		System.out.println(file.getName());
		fs.close();
		
	}
}
