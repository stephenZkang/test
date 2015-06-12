package com.superred.hadoop;

import java.io.IOException;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.BlockLocation;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

/**
 * 查找某个文件在HDFS集群中的位置
 * @author QIAOK
 */
public class BlockLocationDemo {
	public static void main(String[] args) throws IOException {
		Configuration conf = new Configuration();
		FileSystem fileSystem = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"),conf);
		Path fpath = new Path("/usr/hadoop/input/test.txt");
		FileStatus fileStatus = fileSystem.getFileStatus(fpath);
		BlockLocation[] blkLocations = fileSystem.getFileBlockLocations(fileStatus, 0, fileStatus.getLen());
		int len = blkLocations.length;
		for (int i = 0; i < len; i++) {
			String[] hosts = blkLocations[i].getHosts();
			System.out.println("block_"+i+"_location:"+hosts[0]);
		}
		
		
	}
}
