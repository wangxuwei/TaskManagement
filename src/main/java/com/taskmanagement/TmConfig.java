package com.taskmanagement;

import java.io.IOException;
import java.util.Set;

import com.britesnow.snow.web.binding.EntityClasses;
import com.britesnow.snow.web.db.hibernate.HibernateDaoHelper;
import com.britesnow.snow.web.db.hibernate.HibernateDaoHelperImpl;
import com.google.inject.AbstractModule;
import com.google.inject.Inject;
import com.google.inject.Injector;
import com.google.inject.Provides;
import com.google.inject.Singleton;
import com.metapossum.utils.scanner.reflect.ClassesInPackageScanner;
import com.taskmanagement.dao.DaoRegistry;

/**
 * 
 */
public class TmConfig extends AbstractModule {

    @Override
    protected void configure() {
        
        // Default bind for the HibernateDaoHelper.
        bind(HibernateDaoHelper.class).to(HibernateDaoHelperImpl.class);
    }
    
    // Used by the Hibernate support to inject the entity class
    @Provides
    @Singleton
    @Inject
    @EntityClasses
    public Class[] provideEntityClasses() {
        Set<Class<?>> entitySet;
        try {
            entitySet = new ClassesInPackageScanner().findAnnotatedClasses("com.taskmanagement.entity", javax.persistence.Entity.class);
            Class[] entityClasses = new Class[entitySet.size()];
            entitySet.toArray(entityClasses);
            System.out.println(entityClasses);
            return entityClasses;
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Cannot get all the enity class: " + e.getMessage());
        }

    }
    
    @Provides
    @Singleton
    @Inject
    public DaoRegistry providesDaoRegistry(Injector injector, @EntityClasses Class[] entityClasses ){
        DaoRegistry daoRegistry = new DaoRegistry();
        daoRegistry.init(injector, entityClasses);
        return daoRegistry;
    }

}
