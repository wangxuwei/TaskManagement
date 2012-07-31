package com.taskmanagement.dao;

import java.util.List;
import java.util.Map;

public interface IDao<E> {

    public enum SortOrder {
        ASC, DESC
    }

    public E get(Long id);

    public List<E> get(Long... ids);

    public E save(E entity);

    public List<E> save(E... entities);

    public void delete(E entity);

    public void delete(E... entities);

    public List<E> list(int pageIdx, int pageSize, String sortColumn, SortOrder sortOrder);

    public List<E> list(int pageIdx, int pageSize, Map fileterMap, String sortColumn, SortOrder sortOrder);

    public Long count();

    public Long count(Map filterMap);
    
    public Class<E> getPersistentClass();

    public List<E> search(String query, Object[] args);

	void delete(List<E> entities);

}
