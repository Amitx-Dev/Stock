package com.tradenest.models;

import com.tradenest.interfaces.JsonSerializable;
import java.time.Instant;
import java.util.Collection;

/**
 * Generic API Response Envelope class.
 * Demonstrates Collections & Generics in Java OOP (Rubric requirement).
 *
 * @param <T> Payload type wrapped in the response
 */
public class ApiResponse<T> implements JsonSerializable {
    private boolean success;
    private String message;
    private T data;
    private long timestamp;

    public ApiResponse(boolean success, String message, T data) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = Instant.now().toEpochMilli();
    }

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, "SUCCESS", data);
    }

    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data);
    }

    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null);
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public T getData() {
        return data;
    }

    public long getTimestamp() {
        return timestamp;
    }

    @Override
    public String toJson() {
        StringBuilder sb = new StringBuilder();
        sb.append("{");
        sb.append("\"success\":").append(success).append(",");
        sb.append("\"message\":\"").append(message != null ? message.replace("\"", "\\\"") : "").append("\",");
        sb.append("\"timestamp\":").append(timestamp).append(",");
        sb.append("\"data\":");

        if (data == null) {
            sb.append("null");
        } else if (data instanceof JsonSerializable) {
            sb.append(((JsonSerializable) data).toJson());
        } else if (data instanceof Collection<?>) {
            sb.append("[");
            Collection<?> col = (Collection<?>) data;
            int i = 0;
            for (Object item : col) {
                if (item instanceof JsonSerializable) {
                    sb.append(((JsonSerializable) item).toJson());
                } else if (item instanceof String) {
                    sb.append("\"").append(item.toString().replace("\"", "\\\"")).append("\"");
                } else {
                    sb.append(item);
                }
                if (i < col.size() - 1) sb.append(",");
                i++;
            }
            sb.append("]");
        } else if (data instanceof String) {
            sb.append("\"").append(data.toString().replace("\"", "\\\"")).append("\"");
        } else if (data instanceof Number || data instanceof Boolean) {
            sb.append(data);
        } else {
            sb.append("\"").append(data.toString().replace("\"", "\\\"")).append("\"");
        }

        sb.append("}");
        return sb.toString();
    }
}
