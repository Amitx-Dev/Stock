package com.tradenest.models;

import com.tradenest.interfaces.JsonSerializable;

/**
 * Base abstract entity class.
 * Demonstrates Inheritance and Encapsulation in Java OOP.
 */
public abstract class AbstractEntity implements JsonSerializable {
    protected String id;
    protected String createdAt;

    public AbstractEntity() {
    }

    public AbstractEntity(String id, String createdAt) {
        this.id = id;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * Escape strings safely for JSON payloads.
     */
    protected static String escape(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\b", "\\b")
                .replace("\f", "\\f")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}
