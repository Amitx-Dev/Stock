package com.tradenest.interfaces;

/**
 * Interface representing models that can convert themselves into JSON format.
 */
public interface JsonSerializable {
    /**
     * Converts the entity to a valid JSON representation string.
     * @return JSON string
     */
    String toJson();
}
