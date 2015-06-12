package com.superred.hadoop.map;

import java.net.URI;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.MapFile;
import org.apache.hadoop.io.SequenceFile;
import org.apache.hadoop.io.SequenceFile.Reader;

/**
 * 
 * @author QIAOK
 */
public class SequenceFileConvertToMapFile {
	private static final String[] DATA = {
		"One,two,buckle my shoe",
		"Three,four,shut the door",
		"Five,six,pick up sticks",
		"Seven,eight,lay them straight",
		"Nine,ten,a big fat hen"
	};
	public static class MapFileFixerTest{
		
		@SuppressWarnings({ "rawtypes", "unchecked" })
		public void testMapFix(String sqlFile) throws Exception{
			String uri = sqlFile;
			Configuration conf = new Configuration();
			FileSystem fileSystem = FileSystem.get(URI.create("hdfs://192.168.93.33:9000"), conf);
			Path path = new Path(uri);
			Path mapData = new Path(path,MapFile.DATA_FILE_NAME);
			Reader reader = new SequenceFile.Reader(fileSystem, mapData, conf);
			Class keyClass = reader.getKeyClass();
			Class valueClass = reader.getValueClass();
			reader.close();
			long entries = MapFile.fix(fileSystem, path, keyClass, valueClass, false, conf);
			System.out.printf("create MapFile from sequenceFile about %d entries!",entries);
		}
		
	}
	public static void main(String[] args) {
		SequenceFileConvertToMapFile fixer = new SequenceFileConvertToMapFile();
	}
}
