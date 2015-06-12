package com.superred.hadoop;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URI;
import java.net.URL;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.FsUrlStreamHandlerFactory;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.log4j.Logger;

/**
 *  
 * @author QIAOK
 */
public class HDFSDataExample {
	static{
		URL.setURLStreamHandlerFactory(new FsUrlStreamHandlerFactory());
	}
	
	private final Logger logger = Logger.getLogger(getClass());
	public static void main(String[] args) throws IOException {
		HDFSDataExample hdfsDataExample = new HDFSDataExample();
		String cmd ="get";
		String localPath = "e://hadoop.txt";
		String hdfsPath = "/usr/hadoop/input/hadoop.txt";
		boolean print = true;
		if("create".equals(cmd)){
			/**
			 * 将本地文件上传到HDFS系统中
			 */
			hdfsDataExample.create(localPath,hdfsPath);
		}else if("get".equals(cmd)){
			/**
			 * 从HDFS系统下载文件到本地
			 */
			hdfsDataExample.getFile(localPath,hdfsPath,print);
		}
	}
	

	private void getFile(String localPath, String hdfsPath, boolean print) throws IOException {
		FSDataInputStream in = null;
		OutputStream out = null;
		try {
			Configuration conf = new Configuration();
			FileSystem fs = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"), conf);
			Path path = new Path(hdfsPath);
			in = fs.open(path);
			out = new BufferedOutputStream(new FileOutputStream(new File(localPath)));
			IOUtils.copyBytes(in, out, 4096, !print);
			logger.info("get file form hdfs to local"+hdfsPath+","+localPath);
			if(print){
				in.seek(0);
				IOUtils.copyBytes(in, System.out, 4096,true);
			}
		} finally{
			IOUtils.closeStream(out);
		}
		
	}

	private void create(String localPath, String hdfsPath) throws IOException  {
		InputStream in = null;
		try {
			Configuration conf = new Configuration();
			FileSystem fs = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"), conf);
			Path path = new Path(hdfsPath);
			FSDataOutputStream dataOutputStream = fs.create(path);
			in = new BufferedInputStream(new FileInputStream(new File(localPath)));
			IOUtils.copyBytes(in, dataOutputStream, conf, false);
			dataOutputStream.sync();
			dataOutputStream.close();
			logger.info("create file in hdfs:"+hdfsPath);
		}finally{
			IOUtils.closeStream(in);
		}
		
	}
	
}
