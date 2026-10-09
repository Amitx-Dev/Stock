package com.tradenest.server;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Lightweight JSON parser utility for standard Java HTTP Handlers without external dependencies.
 */
public class JsonUtils {

    /**
     * Parses a flat or simple JSON object into a Map<String, String>.
     */
    public static Map<String, String> parseSimpleJson(String json) {
        Map<String, String> map = new HashMap<>();
        if (json == null || json.trim().isEmpty()) return map;

        // Match key-value pairs like "key": "value" or "key": 123.45 or "key": true
        Pattern pattern = Pattern.compile("\"([^\"]+)\"\\s*:\\s*(\"[^\"]*\"|true|false|null|-?\\d+(?:\\.\\d+)?)");
        Matcher matcher = pattern.matcher(json);

        while (matcher.find()) {
            String key = matcher.group(1);
            String val = matcher.group(2);
            if (val.startsWith("\"") && val.endsWith("\"")) {
                val = val.substring(1, val.length() - 1);
            }
            map.put(key, val);
        }
        return map;
    }

    public static String getString(Map<String, String> map, String key, String defaultVal) {
        return map.getOrDefault(key, defaultVal);
    }

    public static int getInt(Map<String, String> map, String key, int defaultVal) {
        try {
            return map.containsKey(key) ? Integer.parseInt(map.get(key)) : defaultVal;
        } catch (Exception e) {
            return defaultVal;
        }
    }

    public static double getDouble(Map<String, String> map, String key, double defaultVal) {
        try {
            return map.containsKey(key) ? Double.parseDouble(map.get(key)) : defaultVal;
        } catch (Exception e) {
            return defaultVal;
        }
    }

    public static boolean getBoolean(Map<String, String> map, String key, boolean defaultVal) {
        try {
            return map.containsKey(key) ? Boolean.parseBoolean(map.get(key)) : defaultVal;
        } catch (Exception e) {
            return defaultVal;
        }
    }
}
