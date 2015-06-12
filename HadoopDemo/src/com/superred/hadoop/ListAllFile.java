package com.superred.hadoop;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.FileUtil;
import org.apache.hadoop.fs.Path;
import org.apache.log4j.Logger;

/**
 * 列出HDFS 目录/usr/hadoop/input下的所有文件
 * @author QIAOK
 */
public class ListAllFile {
	private static final Logger logger = Logger.getLogger(ListAllFile.class);
	public static void main(String[] args) throws FileNotFoundException, IOException {
		Configuration conf = new Configuration();
		FileSystem fs = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"),conf);
		Path path = new Path("/usr/hadoop/input");
		FileStatus[] fileStatus = fs.listStatus(path);
		Path[] paths = FileUtil.stat2Paths(fileStatus);
		for (Path path2 : paths) {
			System.out.println(path2);
		}
		/***
		 * 通配符匹配
		 */
		logger.info("=============路径中匹配通配符=============");
		Path pathPattern = new Path("/usr/hadoop/input/te*");
		FileStatus[] globStatus = fs.globStatus(pathPattern);
		Path[] stat2Paths = FileUtil.stat2Paths(globStatus);
		for (Path path2 : stat2Paths) {
			System.out.println(path2);
		}
	}
}
