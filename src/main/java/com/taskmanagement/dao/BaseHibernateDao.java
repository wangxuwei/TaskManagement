package com.taskmanagement.dao;

import java.lang.reflect.Field;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;

import com.britesnow.snow.web.db.hibernate.HibernateDaoHelper;
import com.google.inject.Inject;
import com.googlecode.gentyref.GenericTypeReflector;
import com.taskmanagement.entity.BaseEntity;

@SuppressWarnings({ "rawtypes", "unchecked" })
public class BaseHibernateDao<E> implements IDao<E> {

    protected Class<E>           persistentClass;

    protected HibernateDaoHelper daoHelper;

    public BaseHibernateDao() {
        Type persistentType = GenericTypeReflector.getTypeParameter(getClass(), BaseHibernateDao.class.getTypeParameters()[0]);
        if (persistentType instanceof Class) {
            this.persistentClass = (Class<E>) persistentType;
        } else {
            throw new IllegalStateException("concrete class " + getClass().getName()
                                    + " must have a generic binding for interface "
                                    + BaseHibernateDao.class.getName());
        }
    }

    @Inject
    public void injectDaoHelper(HibernateDaoHelper daoHelper) {
        this.daoHelper = daoHelper;
    }

    // --------- IDao Interface --------- //
    @Override
    public E get(Long id) {
        // TODO Auto-generated method stub
        return daoHelper.get(persistentClass, id);
    }

    /**
     * TODO: not implemented yet (not needed).
     */
    @Override
    public List<E> get(Long... ids) {
        // TODO Auto-generated method stub
        return null;
    }

    public E save(E entity) {
        return daoHelper.save(entity);
    }

    @Override
    public List<E> save(E... entities) {
        for (E e : entities) {
            save(e);
        }
        // TODO: we need to determine who will build this list (probably the DAOHelper)
        return null;
    }

    @Override
    public void delete(E entity) {
        if (entity instanceof BaseEntity) {
        	save(entity);
        }
       
    }

    @Override
    public void delete(E... entities) {
       for(E entity: entities) {
    	   delete(entity);
       }
    }

    @Override
    public void delete(List entities) {
        for (int i = 0; i < entities.size(); i++) {
            delete((E) entities.get(i));
        }
    }

    @Override
    public List<E> list(int pageIdx, int pageSize, String sortColumn, SortOrder sortOrder) {
        return list(pageIdx, pageSize, null, sortColumn, sortOrder);
    }

    @Override
    public List<E> list(int pageIdx, int pageSize, Map filterMap, String sortColumn, SortOrder sortOrder) {
        String query = "from " + persistentClass.getSimpleName() + " where 1=1";
        
        List filterList = new ArrayList();
        query += getFilterQuery(filterList, filterMap);
        if (StringUtils.isNotEmpty(sortColumn)) {
            query += " order by " + sortColumn;
            if (sortOrder != null) {
                query += " " + sortOrder.toString();
            }
        }
        return (List<E>) daoHelper.find(pageIdx, pageSize, query, filterList.toArray());
    }

    protected String getFilterQuery(List filterList, Map filterMap) {
        String query = "";
        if (filterMap != null) {
            Iterator it = filterMap.keySet().iterator();
            while (it.hasNext()) {
                String key = (String) it.next();
                Object value = (Object) filterMap.get(key);
                if (value == null) {
                    continue;
                }
                Field field = null;
                try {
                    field = persistentClass.getDeclaredField(key);
                } catch (Exception e) {
                    e.printStackTrace();
                }
                if (field == null) {
                    continue;
                }
                String proClassName = field.getType().getSimpleName();
                if ("String".equals(proClassName)) {
                    query += " and " + key + "=? ";
                    filterList.add(value);
                }
                if ("Long".equals(proClassName)) {
                    query += " and " + key + "=? ";
                    filterList.add(new Long(value.toString()));
                }
                if ("Integer".equals(proClassName)) {
                    query += " and " + key + "=? ";
                    filterList.add(new Integer(value.toString()));
                }
            }
        }
        return query;
    }

    @Override
    public List<E> search(String query, Object[] args) {
        return (List<E>) daoHelper.find(0, 50, query, args);
    }

    @Override
    public Long count() {
        return count(null);

    }

    @Override
    public Long count(Map filterMap) {
        String query = "select count(*) from " + persistentClass.getSimpleName()+" where 1=1";
        List filterList = new ArrayList();
        query += getFilterQuery(filterList, filterMap);
        return (Long) daoHelper.findFirst(query, filterList.toArray());
    }

    @Override
    public Class<E> getPersistentClass() {
        // TODO Auto-generated method stub
        return persistentClass;
    }
    // --------- IDao Interface --------- //
}
