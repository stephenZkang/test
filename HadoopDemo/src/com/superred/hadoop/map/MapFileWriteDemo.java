package com.superred.hadoop.map;

import java.io.IOException;
import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.io.IOUtils;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.MapFile;
import org.apache.hadoop.io.Text;

/**
 * 
 * @author QIAOK
 */
public class MapFileWriteDemo {
	private static final String[] DATA = {
		"One,two,buckle my shoe",
		"Three,four,shut the door",
		"Five,six,pick up sticks",
		"Seven,eight,lay them straight",
		"Nine,ten,a big fat hen"
	};
	
	public static void main(String[] args) throws IOException {
		Configuration conf = new Configuration();
		FileSystem fs = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"), conf);
		Text value = new Text();
		IntWritable key = new IntWritable();
		MapFile.Writer writer = null;
		try{
			writer = new MapFile.Writer(conf, fs, "/usr/hadoop/input/test.map", key.getClass(), value.getClass());
			for (int i = 0; i < 1024; i++) {
				key.set(i+1);
				value.set(DATA[i%DATA.length]);
				writer.append(key, value);
			}
			
		}finally{
			IOUtils.closeStream(writer);
		}
		
	}
}
