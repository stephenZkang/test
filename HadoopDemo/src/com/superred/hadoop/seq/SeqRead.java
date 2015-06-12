package com.superred.hadoop.seq;

import java.io.IOException;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.io.SequenceFile;
import org.apache.hadoop.io.Writable;
import org.apache.hadoop.util.ReflectionUtils;

/**
 * HDFS读操作
 * @author QIAOK
 */
public class SeqRead {
	
	public static void main(String[] args) throws IOException{
		//Configuration
		Configuration conf = new Configuration();
		//HDFS File System
		FileSystem fs = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"), conf);
		//Seq File Path
		Path path = new Path("/usr/hadoop/input/test.seq");
		SequenceFile.Reader reader = null;
		try {
			reader = new SequenceFile.Reader(fs, path, conf);
			Writable key = (Writable)ReflectionUtils.newInstance(reader.getKeyClass(), conf);
			Writable value = (Writable)ReflectionUtils.newInstance(reader.getValueClass(), conf);
			
			while(reader.next(key, value)){
				System.out.println(key+"\t"+value);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}finally{
			IOUtils.closeStream(reader);
		}
		
		
	}
}
