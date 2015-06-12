package com.superred.hadoop;

import java.io.IOException;
import java.net.URI;
import java.sql.Timestamp;

import org.apache.commons.net.ntp.TimeStamp;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;

/**
 * 
 * @author QIAOK
 */
public class FileStatusMetadata {
	public static void main(String[] args) throws IOException {
		//读取HADOOP文件系统的配置
		Configuration conf = new Configuration();
		conf.set("hadoop.job.ugi", "jayliu,jayliu");
		//实验1：查看HDFS中某文件的元信息
		System.out.println("实验1：查看HDFS中某文件的元信息");
		String fileUri = "hdfs://192.168.93.33:9000";
		FileSystem fs = FileSystem.get(URI.create(fileUri), conf);
		Path path = new Path("/usr/hadoop/input/test.txt");
		FileStatus fileStatus = fs.getFileStatus(path);
		//获取这个文件的基本信息
		if(fileStatus.isDir() == false){
			System.out.println("这是个文件！");
		}
		System.err.println("文件路径："+fileStatus.getPath());
		System.out.println("文件长度："+fileStatus.getLen());
		System.out.println("文件修改日期："+new TimeStamp(fileStatus.getModificationTime()).toString());
		System.out.println("文件上次访问日期："+new TimeStamp(fileStatus.getAccessTime()).toString());
		System.out.println("文件备份数："+fileStatus.getReplication());
		System.out.println("文件的块大小："+fileStatus.getBlockSize());
		System.out.println("文件所有者："+fileStatus.getOwner());
		System.out.println("文件所在的分组："+fileStatus.getGroup());
		System.out.println("文件的权限："+fileStatus.getPermission().toString());
		System.out.println();
		
		//实验2：查看HDFS中某文件的元信息
		System.out.println("实验2：查看HDFS中某文件的元信息");
		String dirUri = "hdfs://192.168.93.33:9000/usr/hadoop/input";
		FileSystem dirFs = FileSystem.get(URI.create(dirUri), conf);
		FileStatus dirStatus = dirFs.getFileStatus(new Path(dirUri));
		//获取某个目录的基本信息
		System.out.println("目录路径："+dirStatus.getPath());
		System.out.println("目录长度："+dirStatus.getLen());
		System.out.println("目录修改日期："+new TimeStamp(dirStatus.getModificationTime()).toString());
		System.out.println("目录上次访问日期："+new Timestamp(dirStatus.getAccessTime()).toString());
		System.out.println("目录备份数："+dirStatus.getReplication());
		System.out.println("目录的块大小："+dirStatus.getBlockSize());
		System.out.println("目录的所有者："+dirStatus.getOwner());
		System.out.println("目录所在的用户组："+ dirStatus.getGroup());
		System.out.println("目录的权限："+dirStatus.getPermission().toString());
		System.out.println("这个目录下包含以下文件和目录");
		for (FileStatus dfs :dirFs.listStatus(new Path(dirUri))) {
			System.out.println(dfs.getPath());
			
		}
		
	}
}
