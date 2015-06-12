package com.superred.hadoop.seq;

import java.io.IOException;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.SequenceFile;
import org.apache.hadoop.io.Text;

/**
 * HDFS提供的两种容器，分别是SequenceFile和MapFile
 * 
 * @author QIAOK
 */
public class SeqWrite {
	private static final String[] data = {"a,b,c,d,e,f,g","h,i,j,k,l,m,n",
		"o,p,q,r,s,t","u,v,w,x,y,z","0,1,2,3,4","5,6,7,8,9,"};
	
	public static void main(String[] args) throws IOException{
		//获取Configuration的实例
		Configuration conf = new Configuration();
		//HDFS文件系统
		FileSystem fs = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"), conf);
		//序列化文件路径
		Path path = new Path("/usr/hadoop/input/test.seq");
		//打开SequenceFile.Writer对象，写入键值
		SequenceFile.Writer writer= null;
		IntWritable key = new IntWritable();
		Text value = new Text();
		try {
			writer = SequenceFile.createWriter(fs, conf, path, key.getClass(), value.getClass());
			for (int i = 0; i < 10000; i++) {
				key.set(i);
				value.set(SeqWrite.data[i%SeqWrite.data.length]);
				writer.append(key, value);
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			IOUtils.closeStream(writer);
		}
		
	}
}
