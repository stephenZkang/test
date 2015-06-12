package com.superred.hadoop;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.util.Progressable;

/**
 * 向HDFS系统中上传文件的过程中打印进度
 * @author QIAOK
 */
public class FileCopyWithProcess {

	public static void main(String[] args) throws IOException {
		String hdfsPath = "/usr/hadoop/input/l.txt";
		String localSrc = "d://log.txt";
		InputStream in = null;
		FSDataOutputStream out = null;
		try{
			in = new BufferedInputStream(new FileInputStream(new File(localSrc)));
			Configuration conf = new Configuration();
			FileSystem fs = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"), conf);
			Path path = new Path(hdfsPath);
			out = fs.create(path, new Progressable() {
				private int i = 0;
				@Override
				public void progress() {
					System.out.println("."+(++i));
				}
			});
		}finally{
			IOUtils.closeStream(out);
			IOUtils.closeStream(in);
		}
	}
}
