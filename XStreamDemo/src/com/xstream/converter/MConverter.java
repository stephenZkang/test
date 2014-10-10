package com.xstream.converter;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.thoughtworks.xstream.converters.Converter;
import com.thoughtworks.xstream.converters.MarshallingContext;
import com.thoughtworks.xstream.converters.UnmarshallingContext;
import com.thoughtworks.xstream.io.HierarchicalStreamReader;
import com.thoughtworks.xstream.io.HierarchicalStreamWriter;

public class MConverter implements Converter {

	@Override
	public boolean canConvert(@SuppressWarnings("rawtypes") Class arg0) {
		// TODO Auto-generated method stub
		return arg0.equals(Map.class)||arg0.equals(HashMap.class);
	}

	@Override
	@SuppressWarnings("rawtypes")
	public void marshal(Object arg0, HierarchicalStreamWriter arg1,
			MarshallingContext arg2) {
		// TODO Auto-generated method stub
		Map map = (Map) arg0;
		Set entrySet = map.keySet();
		for (Object key : entrySet) {
			String key1 = (String) key;
			String value = (String) map.get(key1);
			arg1.addAttribute(key1, value);
		}

	}

	@Override
	public Object unmarshal(HierarchicalStreamReader arg0,
			UnmarshallingContext arg1) {
		// TODO Auto-generated method stub
		Map<String, String> map = new HashMap<String, String>();
		int attributeCount = arg0.getAttributeCount();
		for (int i = 0; i < attributeCount; i++) {
			map.put(arg0.getAttributeName(i), arg0.getAttribute(i));
		}
		return map;
	}

}
