package com.taskmanagement.dao;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.google.inject.Injector;
import com.google.inject.Singleton;
import com.metapossum.utils.scanner.reflect.ClassesInPackageScanner;

// NOTE: for now this class is instanciated in the XadConfig.provideDaoRegistry because 
//       Injecting the "injector" here get the parent injector and we get an exception
@Singleton
public class DaoRegistry {

    private Map<String, IDao>    daoByEntityClassName   = new HashMap<String, IDao>();
    private Map<Class, IDao>     daoByEntityClass       = new HashMap<Class, IDao>();

    private Map<String, Class>   entityClassByClassName = new HashMap<String, Class>();

    
    // Note: if we inject the injector, we get the WebApplication injector and not the WebModule, and Guice throw an error. So, we call daoRegistry.init from XadConfig with the correct injector.
    public void init(Injector injector,Class[] entityClasses) {
        try {
            Set<Class<? extends BaseHibernateDao>> daoClasses = new ClassesInPackageScanner().findSubclasses("com.xad.cms.dao", BaseHibernateDao.class);
            
            Set<Class> entityClassesWithCustomDao = new HashSet<Class>();
            
            // we do not need the base one
            daoClasses.remove(BaseHibernateDao.class);
            daoClasses.remove(GenericDao.class);
            
            
            // Go through all the DAO classes
            for (Class daoClass : daoClasses) {
                if (daoClass != BaseHibernateDao.class){
                    IDao dao = (IDao) injector.getInstance(daoClass);
                    Class entityClass = dao.getPersistentClass();
                    System.out.println(entityClass + " " + dao);
                    entityClassesWithCustomDao.add(entityClass);
                    entityClassByClassName.put(entityClass.getSimpleName(), entityClass);
                    daoByEntityClassName.put(entityClass.getSimpleName(), dao);
                    daoByEntityClass.put(entityClass, dao);                    
                }
            }
            
            // Go through the other Entity that do not have specific DAOs
            for (Class entityClass : entityClasses){
                if (!entityClassesWithCustomDao.contains(entityClass)){
                    GenericDao dao = (GenericDao) injector.getInstance(GenericDao.class);
                    dao.setPersistentClass(entityClass);
                    System.out.println(entityClass + " " + dao);
                    entityClassByClassName.put(entityClass.getSimpleName(), entityClass);
                    daoByEntityClassName.put(entityClass.getSimpleName(), dao);
                    daoByEntityClass.put(entityClass, dao);                       
                }
            }
            
            
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            throw new RuntimeException("Cannot load the dao classes",e);
        }
        
    }

    public IDao getDao(String entityClassName) {
        return daoByEntityClassName.get(entityClassName);
    }

    public <E> IDao<E> getDao(Class<E> entityClass) {
        return daoByEntityClass.get(entityClass);
    }

    public Object getEntityInstance(String entityClassName) {
        try {
            return entityClassByClassName.get(entityClassName).newInstance();
        } catch (Exception e) {
            throw new RuntimeException("Can't create entityInstance for : " + entityClassName);
        }
    }
    
    public <E> Object getEntityInstance(Class<E> entityClass) {
        try {
            return entityClassByClassName.get(entityClass.getSimpleName()).newInstance();
        } catch (Exception e) {
            throw new RuntimeException("Can't create entityInstance for : " + entityClass.getSimpleName());
        }
    }
    
    
    
}
