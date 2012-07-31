package com.taskmanagement.util;


public class TmUtil {
    public static int getInt(Object obj, int defaultVal) {
    	if(obj == null) {
    		return defaultVal;
    	}
    	
    	if(obj instanceof String) {
    		return getInt(obj.toString(), defaultVal);
    	} else if(obj instanceof Integer) {
    		return ((Integer) obj).intValue();
    	}
    	
    	return defaultVal;
    }
    
    public static int getInt(String str, int defaultVal) {
    	try {
    		return Integer.parseInt(str);
    	} catch(Exception e) {
    		return defaultVal;
    	}
    }

}
