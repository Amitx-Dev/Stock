package com.tradenest.interfaces;

import com.tradenest.exceptions.DatabaseException;
import java.util.List;
import java.util.Optional;

/**
 * Generic Data Access Object (DAO) interface.
 * Demonstrates Generics & Interface design in Java OOP.
 *
 * @param <T>  Entity model type
 * @param <ID> Unique identifier type
 */
public interface GenericDAO<T, ID> {
    /**
     * Retrieves all entities from the database table.
     * @return List of entities (Collections)
     * @throws DatabaseException on database error
     */
    List<T> findAll() throws DatabaseException;

    /**
     * Finds an entity by its primary key identifier.
     * @param id Identifier of type ID (Generics)
     * @return Optional containing entity if found, empty otherwise
     * @throws DatabaseException on database error
     */
    Optional<T> findById(ID id) throws DatabaseException;

    /**
     * Persists a new entity into the database.
     * @param entity Entity of type T
     * @return true if inserted, false otherwise
     * @throws DatabaseException on database error
     */
    boolean create(T entity) throws DatabaseException;

    /**
     * Updates an existing entity in the database.
     * @param entity Entity of type T
     * @return true if updated, false otherwise
     * @throws DatabaseException on database error
     */
    boolean update(T entity) throws DatabaseException;

    /**
     * Deletes an entity by its identifier.
     * @param id Identifier of type ID
     * @return true if deleted, false otherwise
     * @throws DatabaseException on database error
     */
    boolean delete(ID id) throws DatabaseException;
}
