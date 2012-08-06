package com.taskmanagement;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;

import com.britesnow.snow.testsupport.SnowTestSupport;
import com.britesnow.snow.web.db.hibernate.HibernateDaoHelper;
import com.britesnow.snow.web.db.hibernate.HibernateSessionInViewHandler;
import com.taskmanagement.entity.Project;
import com.taskmanagement.entity.User;

public class EntityTest extends SnowTestSupport {
    @BeforeClass
    public static void initTestClass() throws Exception {
        SnowTestSupport.initWebApplication("src/main/webapp");
    }
    private static Project project;

    @Test
    public void testEntity() {
        HibernateSessionInViewHandler view = appInjector.getInstance(HibernateSessionInViewHandler.class);
        view.openSessionInView();
        System.out.println("begin test entity.");

        HibernateDaoHelper daoHelper = appInjector.getInstance(HibernateDaoHelper.class);
        Transaction t = daoHelper.getSession().beginTransaction();
        User user2 = new User();
        user2.setName("client1");
        user2.setPassword("1");
        user2.setUsername("client1");
        User user3 = new User();
        user3.setName("client2");
        user3.setPassword("1");
        user3.setUsername("client2");

        Session session = daoHelper.getSession();
        session.save(user2);
        session.save(user3);
        session.flush();

        String hql = "from User";
        List ls = session.createQuery(hql).list();
        System.out.println("get User list :" + ls);

        project = new Project();
        project.setName("p1");
        Set set = new HashSet();
        set.add(user2);
        set.add(user3);
        project.setUserSet(set);
        session.save(project);
        session.flush();
        t.commit();
    }

    @AfterClass
    public static void dispose() throws Exception {
        System.out.println("--->dispose");
        HibernateDaoHelper daoHelper = appInjector.getInstance(HibernateDaoHelper.class);
        Transaction t = daoHelper.getSession().beginTransaction();
        Session session = daoHelper.getSession();
        Set userSet = project.getUserSet();
        session.delete(project);
        if (userSet != null) {
            Object[] obs = userSet.toArray();
            for (int i = 0; i < obs.length; i++) {
                User user = (User) obs[i];
                session.delete(user);
            }
        }
        session.flush();
        t.commit();
        // SnowTestSupport.releaseWebApplicaton();
    }
}
